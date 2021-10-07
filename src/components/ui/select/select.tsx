import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { SelectProps } from 'semantic-ui-react';
import { Validation } from '../../../model/validation/validation';
import { ValidationNotEmpty } from '../../../model/validation/validation-not-empty';
import { UserAgent } from '../../../utilities/user-agent';
import { ErrorPop } from '../error-pop/error-pop';
import { Required } from '../required/required';
import './select.scss';

type Props = {
  validationList?: Validation[];
  /**  触る前からエラー出すかどうか */
  touch?: boolean;
  noRequireLabel?:boolean;
  require?: boolean;
  defaultLabel?: string;
  onChange: (v: string | number) => void;
  id?: string;
  label?: string;
  value?: number | string;
  /** 任意文字列の場合string Valueの場合true */
  title?: string | boolean;
  options: { text: string, value: string | number; }[]
  errorPosBottom?: boolean;
} & Omit<SelectProps, 'onChange' | 'options'>

export const Select = (props: Props) => {
  const {
    validationList,
    require,
    touch,
    value,
    disabled,
    options,
    onChange,
    defaultLabel,
    className,
    id,
    title,
    label,
    noRequireLabel,
    errorPosBottom,
  } = props;

  /* State */
  const [focus, setFocus] = useState<boolean>(false);
  const [errorList, setErrorList] = useState<string[]>([]);
  const [changed, setChanged] = useState<boolean>(false);
  const error = Boolean((touch || changed) && errorList.length);

  /* Memo */
  const tip = useMemo(() => {
    if (!title) return undefined;
    if (typeof title === 'string') {
      return title;
    }
    if (Number.isNaN(value)) {
      return options[0].text;
    }
    return title ? options.find((v) => v.value === value)?.text || '' : '';
  }, [title, value, options]);

  /* Callback */
  // eslint-disable-next-line
  const handleOnChange = useCallback((v: string | number) => {
    setChanged(true);
    if (onChange) {
      onChange(Number(v) || NaN);
    }
  },
  [changed, onChange]);

  // const handleOnChange = useCallback(
  //   (event: globalThis.React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
  //     setChanged(true);
  //     if (onChange) {
  //       onChange(data.value as string | number);
  //     }
  //   },
  //   [changed, onChange],
  // );

  // eslint-disable-next-line
  const handleOnBlur = useCallback(
    (bv: number) => {
      setChanged(true);
      setFocus(false);
      if (!validationList) {
        setErrorList(
          require ? ValidationNotEmpty
            .filter((v) => !v.run(bv ? String(bv) : ''))
            .map((v) => v.errorMessage)
            : [],
        );
      } else {
        setErrorList(
          require ? [...ValidationNotEmpty, ...validationList]
            .filter((v) => !v.run(bv ? String(bv) : ''))
            .map((v) => v.errorMessage)
            : validationList
              .filter((v) => !v || !v.run(bv ? String(bv) : ''))
              .map((v) => v.errorMessage),
        );
      }
    },
    [validationList],
  );
  // const handleOnBlur = useCallback(
  //   (_:any, data: DropdownProps) => {
  //     setChanged(true);
  //     setFocus(false);
  //     if (!validationList) {
  //       setErrorList(
  //         require ? ValidationNotEmpty
  //           .filter((v) => !v.run(data.value ? String(data.value) : ''))
  //           .map((v) => v.errorMessage)
  //           : [],
  //       );
  //     } else {
  //       setErrorList(
  //         require ? [...ValidationNotEmpty, ...validationList]
  //           .filter((v) => !v.run(data.value ? String(data.value) : ''))
  //           .map((v) => v.errorMessage)
  //           : validationList
  //             .filter((v) => !v || !v.run(data.value ? String(data.value) : ''))
  //             .map((v) => v.errorMessage),
  //       );
  //     }
  //   },
  //   [],
  // );

  useEffect(() => {
    if (touch) {
      if (!validationList) {
        setErrorList(
          require ? ValidationNotEmpty
            .filter((v) => !v.run(value ? String(value) : ''))
            .map((v) => v.errorMessage)
            : [],
        );
      } else {
        setErrorList(
          require ? [...ValidationNotEmpty, ...validationList]
            .filter((v) => !v.run(value ? String(value) : ''))
            .map((v) => v.errorMessage)
            : validationList
              .filter((v) => !v.run(value ? String(value) : ''))
              .map((v) => v.errorMessage),
        );
      }
    }
  }, [touch]);

  return (
    <div
      className={`pulldown_select ${className || ''}`}
      title={tip}
      onFocus={() => setFocus(true)}
    >
      <label className="for_select ">
        <span>{label}</span>{label && require && !noRequireLabel && <Required />}
        <div className={`selector ${error ? 'error' : ''}`}>
          <select
            id={id}
            disabled={disabled}
            onBlur={(e) => { handleOnBlur(Number(e.target.value) ?? 0); }}
            onChange={(e) => { handleOnChange(Number(e.target.value) ?? 0); }}
            value={value ? Number(value) : 0}
            className={`${UserAgent === 'pc' ? ' error_focus' : ''}`}
          >
            {defaultLabel && <option key="default" value={0}>{defaultLabel}</option>}
            {options.map((v, i) => (
              <option key={`${v.text}${i}`} value={String(v.value)}>{v.text}</option>
            ))}
          </select>
          {error && (UserAgent === 'sp' ? focus : true) && (
          <ErrorPop
            messages={errorList}
            errorPosBottom={errorPosBottom}
          />
          )}

        </div>
        {/* {UserAgent === 'pc'
        && (
        <SSelect
          id={id}
          error={error}
          value={value ?? NaN}
          disabled={disabled}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          placeholder={placeholder}
          options={defaultLabel ? [
            { text: defaultLabel, value: NaN },
            ...options,
          ] : options}
        />
        )} */}
      </label>
    </div>
  );
};
