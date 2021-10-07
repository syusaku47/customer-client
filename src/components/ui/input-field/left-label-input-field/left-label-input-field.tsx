import './left-label-input-field.scss';
import { Input, InputProps } from '../../input/input';
import { UserAgent } from '../../../../utilities/user-agent';
import { Required } from '../../required/required';

type Props = {
  value: any;
  // label: string
} & InputProps;

export const LeftLabelInputField = (props: Props) => {
  const {
    label,
    className,
    type,
    placeholder,
    onChange,
    onBlur,
    disabled,
    onEnterKeyPress,
    value,
    validationList,
    touch,
    error,
    require,
    id,
    alignRight,
    title,
    maxLength,
    noRequireLabel,
    errorPosBottom,
    inputMode,
  } = props;

  const baseClassName = 'LeftLabelInputField';
  const defaultClass = UserAgent === 'sp' ? `${baseClassName}_sp` : `${baseClassName}_pc`;

  /* TODO Style */
  return (
    <div style={{ display: 'flex' }} className={`${defaultClass} ${className || ''}`}>
      <label className={`${defaultClass}__label`}>{label}{require && !noRequireLabel && <Required />}</label>
      <Input
        alignRight={alignRight}
        // {...props}
        title={title}
        value={value}
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
        inputMode={inputMode}
        error={error}
        require={require}
        id={id}
        maxLength={maxLength}
        errorPosBottom={errorPosBottom}
      />
    </div>
  );
};
