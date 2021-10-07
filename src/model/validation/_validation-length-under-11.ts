import { Validation } from './validation';

export const ValidationLengthUnder11: Validation[] = [
  new Validation(
    (v) => v.length <= 11,
    '11文字以下で入力してください',
  ),
];
