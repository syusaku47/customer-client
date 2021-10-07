import { Validation } from './validation';

export const ValidationTwitterId: Validation[] = [
  new Validation(
    (v) => Boolean((v.match(/^[A-Za-z0-9_]+$/) && (v.length >= 4 && v.length <= 15)) || v.length === 0),
    '半角英数字で4〜15文字で入力してください。記号は「_」のみ使用できます',
  ),
];
