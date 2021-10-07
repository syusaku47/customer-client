import { getMonth, getYear } from 'date-fns';
import { useEffect } from 'react';
import './horizontal-calendar-header.scss';

type Props = {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  decreaseYear: () => void;
  increaseYear: () => void;
  onChange: (v: Date) => void;
}

export const HorizontalCalendarHeader = (props: Props) => {
  const {
    date, decreaseYear, decreaseMonth, increaseMonth, increaseYear, onChange,
  } = props;

  /* TODO 選択中の年月日、(リストのソートとかで)storeへ保存する必要ありましたらお願いします。 */
  useEffect(() => {
    onChange(new Date(date));
  }, [date]);

  return (
    <div className="horizontalCalendarHeader">
      <div className="pre_year_btn_wrap" onClick={decreaseYear}>
        <i className="fas fa-angle-double-left" />
      </div>
      <div className="pre_month_btn_wrap" onClick={decreaseMonth}>
        <i className="fas fa-chevron-left" />
      </div>
      <div className="date">
        <div>{getYear(date)}年</div>
        <div>{getMonth(date) + 1}月</div>
      </div>
      <div className="next_month_btn_wrap" onClick={increaseMonth}>
        <i className="fas fa-chevron-right" />
      </div>
      <div className="next_year_btn_wrap" onClick={increaseYear}>
        <i className="fas fa-angle-double-right" />
      </div>
    </div>
  );
};
