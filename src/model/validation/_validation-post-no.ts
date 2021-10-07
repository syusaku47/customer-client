import { Validation } from './validation';
import { ValidationNotEmpty2 } from './_validation-not-empty2';

export const ValidationPostNo: Validation[] = [
  ...ValidationNotEmpty2,
  new Validation(
    (v, v2) => !(!v || !v2 || v.length !== 3 || v2.length !== 4),
    '正しく入力してください',
  ),
];
