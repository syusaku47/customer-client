import './left-label-checkbox.scss';
import React from 'react';
import { Checkbox } from '../checkbox';

type Props = {
  label: string,
  /** 任意文字列の場合string Valueの場合true */
  title?: string | boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const LeftLabelCheckbox = (props: Props) => {
  const {
    label, checked, className, onChange, title,
  } = props;

  return (
    <div className={`LeftLabelCheckbox ${className || ''}`}>
      <Checkbox
        title={title}
        checked={checked}
        label={label}
        onChange={onChange}
      />
      {/* <input
          className="LeftLabelCheckbox__form"
          type="checkbox"
          checked={checked}
          name={`${name}`}
          onChange={onChange}
        /> */}
    </div>
  );
};
