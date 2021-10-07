/**
 * 文字の間に任意文字列の挿入
 * @param strAry 文字列配列
 * @param insStr 挿入文字列
 * @returns 連結文字列 or 空文字
 */
export const splitStr = (
  strAry: string[] | undefined,
  insStr: string = '/',
) => strAry?.reduce((
  old,
  current,
) => `${`${old} ${current}`} ${insStr}`, '').slice(0, -1) || '';
