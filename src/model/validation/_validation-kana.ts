import { Validation } from './validation';

export const ValidationKana: Validation[] = [
  new Validation(
    (v) => Boolean(v.match(/^[ァ-ヶー\s]+$/)),
    '全角カナで入力してください',
  ),
];
