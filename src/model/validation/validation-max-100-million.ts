import { Validation } from './validation';

export const ValidationMax100Million: Validation[] = [
  new Validation(
    (v) => Number(v) <= 99999999.99,
    `${99999999.99}以下で入力してください。`,
  ),
];
