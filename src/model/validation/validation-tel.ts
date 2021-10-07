import { Validation } from './validation';

export const ValidationTel: Validation[] = [
  // new Validation(
  //   (v) => Boolean(!Number.isNaN(Number(v))),
  //   '数字で入力してください',
  // ),
  // new Validation(
  //   (v) => !v || v.length === 10 || v.length === 11,
  //   '文字数が合いません',
  // ),
  new Validation(
    (v) => !v || v.length === 10
      || v.length === 11
      || v.length === 12
      || v.length === 13,
    '文字数が合いません',
  ),
  new Validation(
    (v) => Boolean(
      !v || v.match(/^[0-9\\-]+$/),
    ),
    '数字と-（ハイフン）以外は使用できません',
  ),
];
