import { Validation } from './validation';

export const ValidationPostNum2: Validation[] = [
  new Validation(
    (v) => v.length === 4 || v.length === 0,
    '半角数値4文字で入力してください',
  ),
];
