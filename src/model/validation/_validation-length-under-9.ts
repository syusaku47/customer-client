import { Validation } from './validation';

export const ValidationLengthUnder9: Validation[] = [
  new Validation(
    (v) => v.length <= 9,
    '9文字以下で入力してください',
  ),
];
