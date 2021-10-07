import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Input as SInput,
  InputOnChangeData,
  InputProps as SInputProps,
} from 'semantic-ui-react';
import { Validation } from '../../../model/validation/validation';
import { ValidationNotEmpty } from '../../../model/validation/validation-not-empty';
import { ErrorPop } from '../error-pop/error-pop';
import './input.scss';
import { UserAgent } from '../../../utilities/user-agent';
import { MathHelper } from '../../../utilities/math-helper';
import { deleteComma } from '../../../utilities/delete-comma';

export type InputProps = {
  validationList?: Validation[];
  alignRight?: boolean;
  onEnterKeyPress?: () => void;
  /**  触る前からエラー出すかどうか */
  touch?: boolean;
  require?: boolean;
  id?: string;
  name?: string;
  onBlur?: () => void;
  /** 任意文字列の場合string Valueの場合true */
  title?: string | boolean;
  noRequireLabel?: boolean;
  /** 半角英数字のみ対応 */
  maxLength?:number;
  onChangedBlur?: () => void;
  errorPosBottom?: boolean;
  inputMode?: string;
  setIsFocus?: (isFocus: boolean) => void;
} & SInputProps

const InputComponent = (props: InputProps) => {
  const {
    value = '',
    validationList,
    disabled,
    onEnterKeyPress,
    onChange,
    placeholder,
    className,
    touch,
    alignRight,
    type,
    require,
    error,
    name,
    id,
    title,
    onBlur,
    maxLength,
    onChangedBlur,
    errorPosBottom,
    inputMode,
    setIsFocus,
  } = props;

  /* State */
  const [errorList, setErrorList] = useState<string[]>([]);
  const [changed, setChanged] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  /* Memo */
  const isError = useMemo(() => (
    Boolean((touch || changed) && errorList.length)
  ), [touch, changed, errorList]);

  const tip = useMemo(() => {
    if (typeof title === 'string') {
      return title;
    }
    return title ? value : undefined;
  }, [title, value]);

  const now = useMemo(() => new Date().getTime(), []);

  /* Callback */
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      setChanged(true);

      if (onChange) {
        if (maxLength) {
          if (event.target.value.length > maxLength) {
            return;
          }
        }
        onChange(event, data);
      }
    },
    [changed, onChange, value, maxLength],
  );

  const handleOnBlur = useCallback(() => {
    setChanged(true);
    setFocus(false);
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
    if (onBlur) onBlur();
    if (touch && onChangedBlur) onChangedBlur();
  },
  [value, onBlur]);

  const handleOnKeyDown = useCallback((e:React.KeyboardEvent<HTMLDivElement>) => {
    if (type !== 'number') return;
    if (e.key === 'e' /* || e.key === '.'  */|| e.key === '+' || e.key === '-') e.preventDefault();
  }, [type]);

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
              .filter((v) => !v || !v.run(value ? String(value) : ''))
              .map((v) => v.errorMessage),
        );
      }
    }
  }, [touch]);

  useEffect(() => {
    if (setIsFocus) {
      setIsFocus(focus);
    }
  }, [focus]);

  return (
    <div
      className={`
      base_input ${className || ''}
      ${UserAgent === 'pc' ? ' error_focus' : ''}
      `}
      onKeyPress={(e) => { if (e.key === 'Enter' && onEnterKeyPress) { onEnterKeyPress(); } }}
      onBlur={handleOnBlur}
      title={tip}
      onFocus={() => setFocus(true)}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      onKeyDown={handleOnKeyDown}
    >
      <SInput
        className={`${alignRight ? 'align_r' : ''}`}
        error={isError || error}
        value={value || value === 0 ? String(value) : ''}
        disabled={disabled}
        onChange={handleOnChange}
        placeholder={placeholder}
        type={type}
        name={name || now}
        id={id || now}
        input={{
          autoComplete: name || now,
          inputMode: inputMode || (type === 'number' && UserAgent === 'sp' ? 'numeric' : undefined),
          pattern: type === 'number' && UserAgent === 'sp' ? '\\d*' : undefined,
        }}
        // name={name}
        // id={id}
      />
      {/* Error Message */}
      {isError && (UserAgent === 'sp' ? focus : true) && (
        <ErrorPop messages={errorList} errorPosBottom={errorPosBottom} />
      )}
    </div>
  );
};

export const Input = memo(InputComponent);

type InputMoneyProps = {
  decimalPlace: number;
  callbackBlur: (v: string | number) => void;
} & InputProps

export const InputMoney = (props: InputMoneyProps) => {
  const {
    value: _value,
    decimalPlace,
    callbackBlur,
    validationList,
    disabled,
    require,
    touch,
    errorPosBottom,
  } = props;

  const [value, setValue] = useState(
    _value ? MathHelper.rounding(deleteComma(_value), decimalPlace, 'round') : 0,
  );
  const [showValue, setShowValue] = useState(
    MathHelper.rounding2Str(deleteComma(_value), decimalPlace, 'round', true),
  );

  const onFocusOut = useCallback(() => {
    if (!value) {
      callbackBlur(0);
      setValue(0);
      setShowValue('0');
    }
    setValue(MathHelper.rounding(deleteComma(value), decimalPlace, 'round'));
    setShowValue(MathHelper.rounding2Str(deleteComma(value), decimalPlace, 'round', true));
    callbackBlur(MathHelper.rounding(deleteComma(value), decimalPlace, 'round'));
  }, [value, decimalPlace]);

  const onChange = useCallback((e) => {
    const val: string = e.target.value;

    if (val === '') {
      setValue(Number(val));
      setShowValue(val);
      return;
    }

    setValue(Number(String(deleteComma(val)).replace(/[^0-9.]+/g, '')));
    setShowValue(String(deleteComma(val)).replace(/[^0-9.]+/g, ''));
  }, []);

  // const showValue = useMemo(() => {
  //   if (value === 0 || value === '') {
  //     return value;
  //   }
  //   return MathHelper.rounding2Str(value, decimalPlace, 'round', true);
  // }, [value, decimalPlace]);

  return (
    <Input
      value={showValue}
      disabled={disabled}
      onChange={(e) => onChange(e)}
      onBlur={onFocusOut}
      validationList={validationList}
      alignRight
      require={require}
      errorPosBottom={errorPosBottom}
      touch={touch}
    />
  );
};
