import { Validation } from './validation';

export const ValidationEisuzi: Validation[] = [
  new Validation(
    (v) => Boolean(((v.match(/^[a-zA-Z0-9]+$/)) /* || v.length === 0 */)),
    '半角英数字で入力してください。',
  ),
];
