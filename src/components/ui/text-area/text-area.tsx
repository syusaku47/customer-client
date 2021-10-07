import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  InputProps,
  TextArea as STextArea,
  TextAreaProps,
} from 'semantic-ui-react';
import { Validation } from '../../../model/validation/validation';
import { ValidationNotEmpty } from '../../../model/validation/validation-not-empty';
import { UserAgent } from '../../../utilities/user-agent';
import { ErrorPop } from '../error-pop/error-pop';
import './text-area.scss';

type Props = {
  validationList?: Validation[];
  onEnterKeyPress?: () => void;
  /**  触る前からエラー出すかどうか */
  touch?: boolean;
  require?: boolean;
  id?: string;
  name?: string;
  onBlur?: () => void;
  /** 任意文字列の場合string Valueの場合true */
  title?: string | boolean;
  errorPosBottom?: boolean;
} & Omit<InputProps, 'onChange'> & Pick<TextAreaProps, 'rows' | 'onChange' >

const TextAreaComponent = (props: Props) => {
  const {
    value,
    validationList,
    onEnterKeyPress,
    onChange,
    className,
    touch,
    require,
    name,
    id,
    title,
    onBlur,
    rows,
    disabled,
    errorPosBottom,
  } = props;

  /* State */
  const [focus, setFocus] = useState<boolean>(false);
  const [errorList, setErrorList] = useState<string[]>([]);
  const [changed, setChanged] = useState<boolean>(false);

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

  /* Callback */
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) => {
      setChanged(true);
      if (onChange) {
        onChange(event, data);
      }
    },
    [changed, onChange],
  );

  const handleOnBlur = useCallback(() => {
    setChanged(true);
    // setFocus(false);
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
    if (onBlur) onBlur();
  },
  [value, onBlur]);

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
      className={`text_area
      ${isError && (UserAgent === 'sp' ? focus : true) ? 'error ' : ''}
    base_input ${className || ''}
    ${UserAgent === 'pc' ? ' error_focus' : ''}
    `}
      onKeyPress={(e) => { if (e.key === 'Enter' && onEnterKeyPress) { onEnterKeyPress(); } }}
      onBlur={handleOnBlur}
      onFocus={() => setFocus(true)}
      title={tip}
    >
      <STextArea
        rows={rows}
        value={value || value === 0 ? String(value) : ''}
        onChange={handleOnChange}
        name={name}
        id={id}
        disabled={disabled}
      />
      {/* Error Message */}
      {isError && (UserAgent === 'sp' ? focus : true) && (
        <ErrorPop messages={errorList} errorPosBottom={errorPosBottom} />
      )}
    </div>
  );
};

export const TextArea = memo(TextAreaComponent);
