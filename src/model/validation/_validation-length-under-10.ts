import { Validation } from './validation';

export const ValidationLengthUnder10: Validation[] = [
  new Validation(
    (v) => v.length <= 10,
    '10文字以下で入力してください',
  ),
];
