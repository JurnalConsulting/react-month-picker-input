import React, { Component } from 'react';
import InputMask from 'react-input-mask';

const DATE_FORMAT = {
  "default": 'MM/YYYY',
  "ja": 'YY/MM'
}

import MonthCalendar from './calendar';
import { valuesToMask, valuesFromMask } from './utils';

import './styles/index.css';

type OnChange = (maskedValue: string, year: number, month: number) => any;

export interface IProps {
  year?: number,
  month?: number,
  lang?: string,
  inputProps?: {
    name?: string,
    id?: string,
  },
  onChange?: OnChange,
  disabled?: boolean,
};

export interface IState {
  year: number,
  month: number,
  inputValue: string,
  showCalendar: boolean,
};

class MonthPickerInput extends Component<IProps, IState> {
  wrapper: HTMLDivElement;
  input: { input: Element };

  public static defaultProps: Partial<IProps> = {
    inputProps: {}
  };

  constructor(props) {
    super(props);
    const { year, month } = this.props;
    let inputValue = '';

    if (typeof year == 'number' && typeof month == 'number') {
      inputValue = valuesToMask(month, year, this.props.lang);
    }

    this.state = {
      year: year || 0,
      month: month || 0,
      inputValue,
      showCalendar: false,
    }
  };

  componentWillReceiveProps(nextProps) {
    const { year, month } = nextProps;
    let inputValue = '';

    if (typeof year == 'number' && typeof month == 'number') {
      inputValue = valuesToMask(month, year, nextProps.lang);
    }

    this.setState({
      year: nextProps.year,
      month: nextProps.month,
      inputValue: inputValue
    })
  };

  onCalendarChange = (year, month) => {
    const inputValue = valuesToMask(month, year, this.props.lang);
    this.setState({ inputValue, year, month });
    this.onChange(inputValue, year, month);
  };

  onInputChange = (e: { target: { value: string }}) => {
    const mask = e.target.value;

    if (mask.length && mask.indexOf('_') === -1) {
      const [month, year] = valuesFromMask(mask);
      const inputValue = valuesToMask(month, year, this.props.lang);
      this.setState({ year, month, inputValue });
      this.onChange(inputValue, year, month);
    } else this.setState({ inputValue: mask });
  };

  onChange = (inputValue, year, month) => {
    this.setState({ showCalendar: false })

    if (this.props.onChange) {
      this.props.onChange(inputValue, year, month);
    }
  };

  onInputBlur = (e) => {
    if (!this.wrapper.contains(e.target)) {
      this.setState({ showCalendar: false })
    }
  };

  onInputFocus = (e) => {
    if (this.wrapper.contains(e.target)) {
      this.setState({ showCalendar: true });
    }
  };

  onCalendarOutsideClick = (e) => {
    this.setState({ showCalendar: this.input.input == e.target });
  };

  calendar = (): JSX.Element => {
    const { year, month } = this.state;
    let lang = this.props.lang ? this.props.lang : 'default';
    return (
      <div style={{ position: 'relative' }}>
        <MonthCalendar
          year={year}
          month={month}
          lang={lang}
          onChange={this.onCalendarChange}
          onOutsideClick={this.onCalendarOutsideClick}
        />
      </div>
    )
  };

  inputProps = (): object => {
    let dateFormat = DATE_FORMAT["default"];
    if (this.props.lang == "ja") {
      dateFormat = DATE_FORMAT["ja"];
    }
    return Object.assign({}, {
      ref: input => { if(input) this.input = input; },
      mask: "99/9999",
      placeholder: dateFormat,
      type: 'text',
      onBlur: this.onInputBlur,
      onFocus: this.onInputFocus,
      onChange: this.onInputChange,
    }, this.props.inputProps)
  };

  render() {
    const { inputValue, showCalendar } = this.state;

    return (
      <div ref={wrap => { if(wrap) this.wrapper = wrap; }}>
        <InputMask
          value={inputValue}
          disabled={this.props.disabled}
          {...this.inputProps()}
        />

        { showCalendar && this.calendar() }
      </div>
    );
  };
};

export default MonthPickerInput;
