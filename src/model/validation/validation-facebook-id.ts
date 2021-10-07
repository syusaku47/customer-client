import { Validation } from './validation';

export const ValidationFacebookId: Validation[] = [
  new Validation(
    (v) => Boolean((v.match(/^[a-zA-Z0-9.]+$/) && (v.length >= 5 && v.length <= 50)) || v.length === 0),
    '半角英数字で5〜50文字で入力してください。記号は「.」のみ使用できます',
  ),
];
