import { Validation } from './validation';

export const ValidationLength7: Validation[] = [
  new Validation(
    (v) => v.length === 7,
    '7文字で入力してください',
  ),
];
