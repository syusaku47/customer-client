import { Validation } from './validation';

/**
 * 指定した文字数以内の半角数字
 */
const validationNumberLengthUnder = (length:number) => [
  new Validation(
    (v) => v.length <= length,
    `半角数字${length}文字以下で入力してください`,
  ),
];

export const ValidationNumberLengthUnder2 = validationNumberLengthUnder(2);
export const ValidationNumberLengthUnder3 = validationNumberLengthUnder(3);
export const ValidationNumberLengthUnder4 = validationNumberLengthUnder(4);
export const ValidationNumberLengthUnder5 = validationNumberLengthUnder(5);
export const ValidationNumberLengthUnder8 = validationNumberLengthUnder(8);
export const ValidationNumberLengthUnder10 = validationNumberLengthUnder(10);
export const ValidationNumberLengthUnder13 = validationNumberLengthUnder(13);
export const ValidationNumberLengthUnder14 = validationNumberLengthUnder(14);
export const ValidationNumberLengthUnder20 = validationNumberLengthUnder(20);
