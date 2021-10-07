import { ValidationLengthUnder254, ValidationMailAddressEmptyOk } from '../../../model/validation';
import { Input } from './input';

type Props = {
  className?: string;
  value: string | undefined;
  onChange: (v: string) => void;
  touch?: boolean
}

export const InputMail = (props: Props) => {
  const {
    value = '',
    onChange: _onChange,
  } = props;

  const onChange = (v:string) => {
    const isMatch = v.match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/);
    if (isMatch) {
      _onChange(v);
    }
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      validationList={[
        ...ValidationLengthUnder254,
        ...ValidationMailAddressEmptyOk,
      ]}
      maxLength={254}
      type="email"
    />
  );
};
