import { Validation } from './validation';

export const ValidationMax10Billion: Validation[] = [
  new Validation(
    (v) => Number(v) <= 9999999999,
    `${9999999999}以下で入力してください。`,
  ),
];
