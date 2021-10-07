import { Validation } from './validation';

export const ValidationLengthUnder16: Validation[] = [
  new Validation(
    (v) => v.length <= 16,
    '16文字以下で入力してください',
  ),
];
