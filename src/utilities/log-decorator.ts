const colorSet = {
  black: 'color:#000000',
  red: 'color:#ff3c00',
  green: 'color:#90ee90',
  yellow: 'color:#ffffe0',
  blue: 'color:#add8e6',
  white: 'color:#ffffff',
};
type Colors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'white';
/**
 * console.log 用 文字色変更
 *
 *
 * 色を変更したい部分を < > で囲むと色が変わる ( 1行につき1箇所 )
 *
 * 例) console.log(...LogDecorator(`piyoyo<hoge>pipi`, 'blue'));
 *
 * @param str 対象の文字列
 * @param color 変更したい色
 */
export const LogDecorator = (str: string, color: Colors) => [str.replace('<', '%c').replace('>', '%c'), colorSet[color], ''];
