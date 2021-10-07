import { Validation } from './validation';

export const ValidationLength1: Validation[] = [
  new Validation(
    (v) => v.length === 1,
    '1文字で入力してください',
  ),
];
