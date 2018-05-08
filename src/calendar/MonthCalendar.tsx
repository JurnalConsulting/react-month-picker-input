import React, { Component } from 'react';

import OutsideClickWrapper from '../OutsideClickWrapper';

import Head from './Head';
import { MONTHS_NAMES, VIEW_MONTHS, VIEW_YEARS } from './constants';

export interface IProps {
  year: number,
  month: number,
  lang: string,
  startYear?: number,
  onChange: (selectedYear: number, selectedMonth: number) => any,
  onOutsideClick: (e: any) => any,
}

export interface IState {
  currentYear: number,
  selectedYear: number,
  selectedMonth: number,
  currentView: string,
}

class MonthCalendar extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);

    const { year, month } = this.props;

    const startYear = this.props.startYear || new Date().getFullYear() - 6;

    this.state = {
      currentYear: year || 0,
      selectedYear: year || 0,
      selectedMonth: month || 0,
      currentView: year ? VIEW_MONTHS : VIEW_YEARS,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { month } = nextProps;
    const { selectedYear, selectedMonth, currentYear } = this.state;
    
    if (typeof currentYear == 'number' &&
      typeof month == 'number' &&
      (currentYear !== selectedYear || month !== selectedMonth)
    ) {
      this.setState({
        selectedYear: currentYear,
        selectedMonth: month,
        currentView: VIEW_MONTHS
      });
    }
  }

  onChange = (selectedYear, selectedMonth): void => {
    if (typeof selectedYear == 'number' && typeof selectedMonth == 'number') {
      this.props.onChange(selectedYear, selectedMonth);
    }
  }

  selectYear = (selectedYear: number): void => {
    this.setState({ selectedYear, currentView: VIEW_MONTHS });
    this.onChange(selectedYear, this.state.selectedMonth);
  };

  selectMonth = (selectedMonth: number): void => {
    this.setState({ selectedMonth });
    this.onChange(this.state.selectedYear, selectedMonth);
  };

  previous = (): void => {
    let currentYearDown = this.state.currentYear - 1;
    this.setState({
      currentYear: currentYearDown,
      selectedYear: currentYearDown,
    });
  }

  next = (): void => {
    let currentYearUp = this.state.currentYear + 1;
    this.setState({
      currentYear: currentYearUp,
      selectedYear: currentYearUp,
    });
  }

  isYears = (): boolean => {
    return this.state.currentView === VIEW_YEARS;
  }

  renderMonths = (): JSX.Element[] => {
    const { selectedMonth } = this.state;

    return MONTHS_NAMES[this.props.lang].map((month, index) => {      
      return (
        <div
          key={index}
          onClick={() => this.selectMonth(index)}
          className={`col_mp span_1_of_3_mp`}
        >{month}</div>
      )
    });
  };

  render(): JSX.Element {
    const { currentYear, selectedMonth } = this.state;
    return (
      <OutsideClickWrapper
        onOutsideClick={this.props.onOutsideClick}
        className="calendar-container"
      >
        <Head
          year={currentYear}
          month={selectedMonth + 1}
          lang={this.props.lang}
          onValueClick={() => this.setState({ currentView: VIEW_YEARS })}
          onPrev={this.previous}
          onNext={this.next} />

        {this.renderMonths()}
      </OutsideClickWrapper>
    );
  }
};

export default MonthCalendar;
