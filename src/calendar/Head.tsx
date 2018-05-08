import React, { PureComponent } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft'
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight'

export interface IProps {
  month: number,
  year: number,
  lang: string,
  onNext: () => any,
  onPrev: () => any,
  onValueClick: () => any,
}

class Head extends PureComponent<IProps> {
  selectedValue(): number {
    const { year } = this.props;
    
    return year
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
