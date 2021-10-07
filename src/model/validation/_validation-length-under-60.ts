import { Validation } from './validation';

export const ValidationLengthUnder60: Validation[] = [
  new Validation(
    (v) => v.length <= 60,
    '60文字以下で入力してください',
  ),
];
