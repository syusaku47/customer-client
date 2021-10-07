import { Validation } from './validation';

export const ValidationLengthUnder1: Validation[] = [
  new Validation(
    (v) => v.length <= 1,
    '1文字以下で入力してください',
  ),
];
