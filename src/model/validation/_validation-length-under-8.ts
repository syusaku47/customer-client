import { Validation } from './validation';

export const ValidationLengthUnder8: Validation[] = [
  new Validation(
    (v) => v.length <= 8,
    '8文字以下で入力してください',
  ),
];
