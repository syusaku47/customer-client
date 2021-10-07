import { Validation } from './validation';

export const ValidationPassword: Validation[] = [
  new Validation(
    (v) => (
    //   new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z\d]{8,}$/).test(v)
    // ),
    // '半角の数字, 英字(小), 英字(大)をすべて含んだ８文字以上',

      new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z\d]{8,16}$/).test(v) || !v.length
    ),
    '半角の数字, 英字(小), 英字(大)をすべて含んだ８〜１６文字で入力してください',
  ),
];
