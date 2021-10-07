import { Validation } from './validation';

export const ValidationMailAddressEmptyOk: Validation[] = [
  new Validation(
    // [英数字+記号]@[ドメイン]
    (v) => Boolean(v.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/) || v.length === 0),
    '正しい形式で入力してください',
  ),
];
