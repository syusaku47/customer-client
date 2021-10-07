import './checkbox.scss';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

type Props = {
  label?: string,
  /** 任意文字列の場合string Valueの場合true */
  title?: string | boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

/* TODO チェックボックスにスタイル適用が入る場合は呼出しする。無ければ削除を忘れないこと。 */
export const Checkbox = (props: Props) => {
  const {
    label,
    checked,
    onChange,
    title,
    disabled,
  } = props;

  /* State */
  const [isChecked, setIsChecked] = useState(false);

  /* Memo */
  // const tip = useMemo(() => {
  //   if (!title || !label) return undefined;
  //   return typeof title === 'string' ? title : label;
  // }, [title, label]);
  const tip = useMemo(() => {
    if (title && typeof title === 'string') return title;
    return undefined;
  }, [title]);

  /* Callback */
  const handleClickCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      setIsChecked(!isChecked);
    },
    [onChange, isChecked],
  );

  useEffect(() => {
    setIsChecked(Boolean(checked));
  }, [checked]);

  return (
    <div className="checkbox" title={tip}>
      <label className={isChecked ? 'checked' : ''}>
        <input
          className="checkbox__form"
          id="base_checkbox"
          type="checkbox"
          disabled={disabled}
          checked={isChecked}
          onChange={handleClickCheck}
        />
        {label}
      </label>
    </div>
  );
};
