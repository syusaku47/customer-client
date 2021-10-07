import { Validation } from './validation';

export const ValidationPostNum1: Validation[] = [
  new Validation(
    (v) => v.length === 3 || v.length === 0,
    '半角数値3文字で入力してください',
  ),
];
