import { Validation } from './validation';

export const ValidationLengthUnder20: Validation[] = [
  new Validation(
    (v) => v.length <= 20,
    '20文字以下で入力してください',
  ),
];
