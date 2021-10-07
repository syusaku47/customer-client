import './right-label-input-field.scss';
import { Input, InputProps } from '../../input/input';
import { UserAgent } from '../../../../utilities/user-agent';

type Props = InputProps;

export const RightLabelInputField = (props: Props) => {
  const {
    label,
    className,
    type,
    placeholder,
    onChange,
    disabled,
    onEnterKeyPress,
    value,
    validationList,
    touch,
    error,
    title,
    onBlur,
    alignRight,
    maxLength,
    errorPosBottom,
    inputMode,
  } = props;

  const baseClassName = 'RightLabelInputField';
  const defaultClass = UserAgent === 'sp' ? `${baseClassName}_sp` : `${baseClassName}_pc`;

  /** TODO: CSSに追加お願いします */
  return (
    <div style={{ display: 'flex' }} className={`${defaultClass} ${className || ''}`}>
      <Input
        value={value}
        alignRight={alignRight}
        title={title}
        className={`${defaultClass}__field`}
        type={type}
        onBlur={onBlur}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        label={undefined}
        onEnterKeyPress={onEnterKeyPress}
        validationList={validationList}
        touch={touch}
        error={error}
        inputMode={inputMode}
        maxLength={maxLength}
        errorPosBottom={errorPosBottom}
      />
      <label className={`${defaultClass}__label`}>{label}</label>
    </div>
  );
};
