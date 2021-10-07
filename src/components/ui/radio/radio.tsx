import React, { ChangeEventHandler, useCallback, useState } from 'react';
import './radio.scss';

type Props = {
  label?: string,
  name: string,
  value?: string,
  checked: boolean,
  onChange: ChangeEventHandler<any>;
}

export const Radio = (props: Props) => {
  const {
    label,
    name,
    value,
    checked,
    onChange,
  } = props;

  /* State */
  const [isChecked, setIsChecked] = useState(checked);

  /* Callback */
  const handleClickCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      setIsChecked(!isChecked);
    },
    [onChange, isChecked],
  );

  return (
    <div className="radio">
      <label className={checked ? 'checked' : ''}>
        <input
          className="radio__form"
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleClickCheck}
        />
        {label}
      </label>
    </div>
  );
};
