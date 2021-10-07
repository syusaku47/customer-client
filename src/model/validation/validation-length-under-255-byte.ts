import { Validation } from './validation';

export const ValidationLengthUnder255Byte: Validation[] = [
  new Validation(
    (v) => new Blob([v], { type: 'text/plain' }).size < 255,
    '全角84文字(半角254文字)で入力してください',
  ),
];
