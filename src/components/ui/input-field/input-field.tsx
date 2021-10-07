import './input-field.scss';
import { InputProps as SInputProps } from 'semantic-ui-react';
import { LeftLabelInputField } from './left-label-input-field/left-label-input-field';
import { RightLabelInputField } from './right-label-input-field/right-label-input-field';
import { TopLabelInputField } from './top-label-input-field/top-label-input-field';
import { Input, InputProps } from '../input/input';

type Props = {
  labelPlace?: 'top' | 'left' | 'right';
} & SInputProps & InputProps;

/** @deprecated 使用しない */
export const InputField = (props: Props) => {
  const {
    label,
    labelPlace,
    value,
    validationList,
    disabled,
    onEnterKeyPress,
    onChange,
    placeholder,
    className,
    touch,
    error,
    require,
  } = props;

  return (
    <>
      {labelPlace === 'top'
        && (
          <TopLabelInputField
            value={value}
            validationList={validationList}
            disabled={disabled}
            onEnterKeyPress={onEnterKeyPress}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            touch={touch}
            require={require}
            error={error}
          />
        )}

      {labelPlace === 'left'
        && (
          <LeftLabelInputField
            label={label}
            value={value}
            validationList={validationList}
            disabled={disabled}
            onEnterKeyPress={onEnterKeyPress}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            touch={touch}
            require={require}
            error={error}
          />
        )}

      {labelPlace === 'right'
        && (
          <RightLabelInputField
            label={label}
            value={value}
            validationList={validationList}
            disabled={disabled}
            onEnterKeyPress={onEnterKeyPress}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            touch={touch}
            require={require}
            error={error}
          />
        )}

      {!labelPlace
        && (
          <Input
            value={value}
            validationList={validationList}
            disabled={disabled}
            onEnterKeyPress={onEnterKeyPress}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            touch={touch}
            require={require}
            error={error}
          />
        )}
    </>
  );
};
