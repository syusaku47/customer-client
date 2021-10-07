import { Validation } from './validation';

// 郵便番号として使用
const ValidationLength = (length: number) => [
  new Validation(
    (v) => v.length === length,
    `${length}文字で入力してください`,
  ),
];

export const ValidationLength2 = ValidationLength(2);
export const ValidationLength3 = ValidationLength(3);
export const ValidationLength4 = ValidationLength(4);
