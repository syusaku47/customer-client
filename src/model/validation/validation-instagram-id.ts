import { Validation } from './validation';

export const ValidationInstagramId: Validation[] = [
  new Validation(
    (v) => Boolean(((v.match(/^[a-zA-Z0-9._]+$/) && (v.length <= 30)) || v.length === 0)),
    '半角英数字で30文字以内で入力してください。記号は「.」、「_」のみ使用できます',
  ),
];
