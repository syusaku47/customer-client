import { Validation } from './validation';

export const ValidationLineId: Validation[] = [
  new Validation(
    (v) => Boolean((v.match(/^[A-Za-z0-9-._]+$/) && (v.length >= 2 && v.length <= 40)) || v.length === 0),
    '半角英数字で2〜40文字で入力してください。記号は「.」、「-」、「_」のみ使用できます',
  ),
];
