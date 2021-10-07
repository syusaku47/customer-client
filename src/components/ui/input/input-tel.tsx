import { ValidationTel } from '../../../model/validation';
import { Input } from './input';

type Props = {
  className?: string;
  value: string | undefined;
  onChange: (v: string) => void;
  touch?: boolean;
}

export const InputTel = (props: Props) => {
  const {
    value = '',
    onChange: _onChange,
  } = props;

  const onChange = (v:string) => {
    const isMatch = v.match(/[^0-9-]+/g);
    if (!isMatch) {
      _onChange(v);
    }
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={20}
      validationList={ValidationTel}
      type="tel"
    />
  );
};
