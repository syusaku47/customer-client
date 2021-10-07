import { Validation } from './validation';

export const ValidationLengthUnder2: Validation[] = [
  new Validation(
    (v) => v.length <= 2,
    '2文字以下で入力してください',
  ),
];
