import React, { PureComponent } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft'
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight'

export interface IProps {
  month: void|number,
  year: void|number,
  lang: string,
  onNext: () => any,
  onPrev: () => any,
  onValueClick: () => any,
}

class Head extends PureComponent<IProps> {
  selectedValue(): string|number {
    const { month, year } = this.props;

    if (typeof year != 'number') {
      return '';
    } else if (typeof month != 'number') {
      return year;
    } else {
      const monthVal = month < 10 ? '0' + month : month;
      if (this.props.lang == "ja") {
        return year + '/' + monthVal;
      }
      return monthVal + '/' + year;
    }
  };

  render(): JSX.Element {
    return (
      <div className="section_mp group_mp">
        <div className="col_mp span_1_of_3_mp arrows_mp"
          onClick={this.props.onPrev}><FontAwesomeIcon icon={faChevronLeft} /></div>

        <div className="col_mp span_1_of_3_mp selected_date_mp"
          onClick={this.props.onValueClick}
        >
          {this.selectedValue()}
        </div>

        <div className="col_mp span_1_of_3_mp arrows_mp"
          onClick={this.props.onNext}><FontAwesomeIcon icon={faChevronRight} /></div>
      </div>
    )
  }
}

export default Head;
