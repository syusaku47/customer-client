import { Validation } from './validation';

export const ValidationLengthUnder7: Validation[] = [
  new Validation(
    (v) => v.length <= 7,
    '7文字以下で入力してください',
  ),
];
