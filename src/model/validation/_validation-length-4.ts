import { Validation } from './validation';

export const ValidationLength4: Validation[] = [
  new Validation(
    (v) => v.length === 4,
    '4文字で入力してください',
  ),
];
