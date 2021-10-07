import { Validation } from './validation';

export const ValidationLengthUnder3: Validation[] = [
  new Validation(
    (v) => v.length <= 3,
    '3文字以下で入力してください',
  ),
];
