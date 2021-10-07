import './top-label-input-field.scss';
import { Input, InputProps } from '../../input/input';
import { Required } from '../../required/required';
import { UserAgent } from '../../../../utilities/user-agent';

type Props =InputProps

export const TopLabelInputField = (props: Props) => {
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
    require,
    error,
    name,
    id,
    title,
    alignRight,
    onBlur,
    maxLength,
    noRequireLabel,
    errorPosBottom,
    inputMode,
  } = props;

  const baseClassName = 'TopLabelInputField';
  const defaultClass = UserAgent === 'sp' ? `${baseClassName}_sp` : `${baseClassName}_pc`;

  return (
    <div className={`${defaultClass} ${className || ''}`}>
      <span className={`${defaultClass}__label`}>{label}{require && !noRequireLabel && <Required />}</span>
      <Input
        title={title}
        alignRight={alignRight}
        value={value}
        className={`${defaultClass}__field`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        label={undefined}
        onEnterKeyPress={onEnterKeyPress}
        validationList={validationList}
        touch={touch}
        require={require}
        error={error}
        name={name}
        id={id}
        maxLength={maxLength}
        onBlur={onBlur}
        errorPosBottom={errorPosBottom}
        inputMode={inputMode}
      />
    </div>
  );
};
