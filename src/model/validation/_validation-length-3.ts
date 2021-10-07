import { Validation } from './validation';

export const ValidationLength3: Validation[] = [
  new Validation(
    (v) => v.length === 3,
    '3文字で入力してください',
  ),
];
