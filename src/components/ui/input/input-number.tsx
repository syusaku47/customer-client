import { useState } from 'react';
import { deleteComma } from '../../../utilities/delete-comma';
import { MathHelper } from '../../../utilities/math-helper';
import { Input, InputProps } from './input';

type Props = {
  value: number | undefined;
  decimalPlace?: number;
  maxPlace?: number;
  onChange: (v: number) => void;
  onBlur?: () => void;
  /** マイナス値の許容 */
  minusPermission?: boolean
} & Omit<InputProps, 'value' | 'onChange' | 'onBlur'>;

export const InputNumber = (props: Props) => {
  const {
    value = 0,
    onChange: _onChange,
    onBlur: _onBlur,
    decimalPlace = 0,
    maxPlace,
    minusPermission,
  } = props;

  const [showValue, setShowValue] = useState(MathHelper.rounding2Str(deleteComma(value), decimalPlace, 'round', true));

  const onChange = (v: string) => {
    // マイナスを一回、先頭のみ許容
    if (
      minusPermission
      && (
        (v[0] === '-' && ((v.match(/-/g))?.length || 0) >= 2)
        || (v[0] !== '-' && ((v.match(/-/g))?.length || 0))
      )
    ) return;

    // ドットを一回のみ許容
    const dotLen = v.toString().match(/\./g)?.length;
    if ((dotLen || 0) >= 2 || (dotLen && !decimalPlace)) return;

    const isMatch = minusPermission
      ? v.match(/[^0-9.\-,]+/g)
      : v.match(/[^0-9.,]+/g);

    if (!isMatch) {
      const splitNum = v.toString().split('.');
      if (splitNum.length === 2 && splitNum[1].length > decimalPlace) return;

      if (maxPlace) {
        const val = deleteComma(v);
        if (String(val).length <= maxPlace) {
          _onChange(deleteComma(v));
          setShowValue(v);
        }
        return;
      }
      _onChange(deleteComma(v));
      setShowValue(v);
    }
  };

  const onBlur = () => {
    setShowValue(
      MathHelper.rounding2Str(deleteComma(showValue), decimalPlace, 'round', true),
    );
    if (_onBlur) { _onBlur(); }
  };

  return (
    <Input
      {...props}
      value={showValue}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      inputMode="numeric"
    />
  );
};
