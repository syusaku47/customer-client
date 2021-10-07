import { Validation } from './validation';

export const ValidationLengthUnder5: Validation[] = [
  new Validation(
    (v) => v.length <= 6,
    '6文字以下で入力してください',
  ),
];
