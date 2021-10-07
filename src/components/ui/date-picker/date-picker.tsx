import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Validation } from '../../../model/validation/validation';
import './date-picker.scss';
import { UserAgent } from '../../../utilities/user-agent';
import { Required } from '../required/required';
import { DateFormatter } from '../../../utilities/date-formatter';
import { ErrorPop } from '../error-pop/error-pop';
import { ValidationNotEmpty } from '../../../model/validation/validation-not-empty';

type DateProps = {
  type?: 'year/month' | 'year/moth/day',
  date: Date | null,
  onChange: (v: Date | null) => void,
  // dateFormat?: DateFormat,
  disabled?: boolean,
  /**  触る前からエラー出すかどうか */
  touch?: boolean;
  /** バリデーション */
  validationList?: Validation[],
  /** エラーメッセージの表示位置を下に表示する場合 */
  errorPosBottom?: boolean,
  minDate?: string;
  label?: string;
  require?: boolean;
  /** 任意文字列の場合string Valueの場合true */
  title?: string | boolean;
  noRequireLabel?: boolean;
};

/* Material UI 用 */
const defaultMaterialTheme = createMuiTheme({});

export const DatePicker = (props: DateProps) => {
  const {
    date,
    onChange,
    disabled,
    touch,
    validationList,
    errorPosBottom,
    minDate,
    require,
    label,
    title,
    noRequireLabel,
    type,
  } = props;

  /* State */
  const [changed, setChanged] = React.useState<boolean>(false);
  const [errorMessageList, setErrorMessageList] = useState<string[]>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  /* Memo */
  const tip = useMemo(() => {
    if (!title) return undefined;
    if (typeof title === 'string') {
      return title;
    }
    return DateFormatter.date2str(date) || '';
  }, [title, date]);

  /* Callback */
  const changeVal = useCallback(
    (value: MaterialUiPickersDate) => {
      onChange(value);
    }, [onChange],
  );

  /* Effect */
  useEffect(
    () => {
      if (touch) {
        if (!validationList) {
          setErrorMessageList(
            require ? ValidationNotEmpty
              .filter((v) => !v.run(date ? DateFormatter.date2str(date) : ''))
              .map((v) => v.errorMessage)
              : [],
          );
        } else {
          setErrorMessageList(
            require ? [...ValidationNotEmpty, ...validationList]
              .filter((v) => !v.run(date ? DateFormatter.date2str(date) : ''))
              .map((v) => v.errorMessage)
              : validationList
                .filter((v) => !v || !v.run(date ? DateFormatter.date2str(date) : ''))
                .map((v) => v.errorMessage),
          );
        }
      }
    },
    [touch],
  );

  const error = useMemo(() => Boolean((touch || changed) && errorMessageList.length),
    [touch, changed, errorMessageList]);
  const baseClassName = 'DatePicker';
  const defaultClass = useMemo(() => (UserAgent === 'sp' ? `${baseClassName}-sp` : `${baseClassName}-pc`),
    [UserAgent]);

  const handleOnBlur = useCallback(() => {
    setChanged(true);
    setFocus(false);
    if (!validationList) {
      setErrorMessageList(
        require ? ValidationNotEmpty
          .filter((v) => !v.run(date ? DateFormatter.date2str(date) : ''))
          .map((v) => v.errorMessage)
          : [],
      );
    } else {
      setErrorMessageList(
        require ? [...ValidationNotEmpty, ...validationList]
          .filter((v) => !v.run(date ? DateFormatter.date2str(date) : ''))
          .map((v) => v.errorMessage)
          : validationList
            .filter((v) => !v.run(date ? DateFormatter.date2str(date) : ''))
            .map((v) => v.errorMessage),
      );
    }
  },
  [date]);

  return (
    <div
      title={tip}
      onFocus={() => setFocus(true)}
      onBlur={handleOnBlur}
      className={
        `datePicker
        ${disabled ? ' disabled' : ('')}
        ${error ? ' InputTextError' : ('')}
        ${UserAgent === 'pc' ? ' error_focus' : ''}
        `
      }
    >
      {error && (UserAgent === 'sp' ? focus : true) && (
      <ErrorPop messages={errorMessageList} errorPosBottom={errorPosBottom} />
      )}

      <label className={`${defaultClass}__label`}>{label}{require && !noRequireLabel && <Required />}</label>
      <ThemeProvider theme={defaultMaterialTheme}>
        <KeyboardDatePicker
          onClick={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
          // type={getDatePickerType(dateFormat)}
          views={type === 'year/month' ? ['year', 'month'] : undefined}
          className={error && (UserAgent === 'sp' ? focus : true) ? 'error' : ''}
          value={date}
          inputVariant="outlined"
          autoOk
          onChange={(e) => {
            setChanged(true);
            changeVal(e);
          }}
          InputProps={{
            readOnly: true,
          }}
          onBlur={() => setFocus(false)}
          label={undefined}
          error={error}
          disabled={disabled}
          clearable
          maxDateMessage={null}
          minDateMessage={null}
          invalidDateMessage={null}
          minDate={minDate || '1900-01-01'}
          inputMode="numeric"
          type="tel"
          // TODO 築年数差異を表示
          // format={type === 'year/month' ? `yyyy年MM月(${33}年)` : 'yyyy年MM月dd日'}
          format={type === 'year/month' ? 'yyyy/MM' : 'yyyy/MM/dd'}
          InputAdornmentProps={{ position: 'end' }}
        />
      </ThemeProvider>
    </div>
  );
};
