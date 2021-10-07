import { Validation } from './validation';

export const ValidationLengthUnder33: Validation[] = [
  new Validation(
    (v) => v.length <= 33,
    '33文字以下で入力してください',
  ),
];
