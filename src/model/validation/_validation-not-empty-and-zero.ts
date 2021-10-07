import { Validation } from './validation';

export const ValidationNotEmptyAndZero: Validation[] = [
  new Validation(
    (v) => Number(v) > 0 || !!v,
    '0以上の数値を入力して下さい',
  ),
];
