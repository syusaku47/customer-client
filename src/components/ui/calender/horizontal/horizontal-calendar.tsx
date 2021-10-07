import React, { useState } from 'react';
import DatePicker, { } from 'react-datepicker';
import { HorizontalCalendarHeader } from './header/horizontal-calendar-header';
import './horizontal-calendar.scss';

type Props = {
  value: Date;
  onChange: (v:Date) => void;
};

export const HorizontalCalendar = (props: Props) => {
  const { value, onChange } = props;

  const [selectDay, setSelectDay] = useState(value);

  return (
    <div className="horizontalCalendar">
      <DatePicker
        className="horizontalCalendar_input"
        openToDate={selectDay}
        onChange={() => {}}
        open
        renderCustomHeader={({
          date,
          decreaseYear,
          decreaseMonth,
          increaseMonth,
          increaseYear,
        }) => (
          <HorizontalCalendarHeader
            date={date}
            onChange={(v) => {
              onChange(v);
              setSelectDay(v);
            }}
            decreaseYear={decreaseYear}
            decreaseMonth={decreaseMonth}
            increaseMonth={increaseMonth}
            increaseYear={increaseYear}
          />
        )}
      />
    </div>
  );
};
