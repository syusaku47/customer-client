import { Validation } from './validation';

const validationLengthUnder = (length:number) => [
  new Validation(
    (v) => v.length <= length,
    `${length}文字以下で入力してください`,
  ),
];

export const ValidationLengthUnder2 = validationLengthUnder(2);
export const ValidationLengthUnder4 = validationLengthUnder(4);
export const ValidationLengthUnder5 = validationLengthUnder(5);
export const ValidationLengthUnder8 = validationLengthUnder(8);
export const ValidationLengthUnder10 = validationLengthUnder(10);
export const ValidationLengthUnder13 = validationLengthUnder(13);
export const ValidationLengthUnder20 = validationLengthUnder(20);
export const ValidationLengthUnder40 = validationLengthUnder(40);
export const ValidationLengthUnder50 = validationLengthUnder(50);
export const ValidationLengthUnder60 = validationLengthUnder(60);
export const ValidationLengthUnder100 = validationLengthUnder(100);
export const ValidationLengthUnder161 = validationLengthUnder(161);
export const ValidationLengthUnder225 = validationLengthUnder(225);
export const ValidationLengthUnder254 = validationLengthUnder(254);
export const ValidationLengthUnder255 = validationLengthUnder(255);
export const ValidationLengthUnder500 = validationLengthUnder(500);
