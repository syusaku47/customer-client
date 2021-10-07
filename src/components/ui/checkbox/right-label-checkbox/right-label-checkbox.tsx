import './right-label-checkbox.scss';
import React from 'react';
import { Checkbox } from '../checkbox';

type Props = {
  label: string,
  /** 任意文字列の場合string Valueの場合true */
  // title?: string | boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const RightLabelCheckbox = (props: Props) => {
  const {
    // label, checked, className, onChange, title,
    label, checked, className, onChange,
  } = props;

  return (
    <div className={`RightLabelCheckbox ${className || ''}`}>
      <Checkbox
        checked={checked}
        label={label}
        onChange={onChange}
        title={label/* title*/}
      />
      {/* <input
          className="RightLabelCheckbox__form"
          type="checkbox"
          checked={checked}
          name={`${name}`}
          onChange={onChange}
        /> */}
    </div>
  );
};
