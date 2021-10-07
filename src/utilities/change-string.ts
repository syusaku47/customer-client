/**
 * ハイフンを指定の文字列に置き換える
 * @param targetStr 対象文字列
 * @param newStr 変更文字列
 * @returns 置き換え後の文字列
 */
export const changeString = (targetStr: string, newStr: string) => (targetStr ? targetStr.replace(/-/g, newStr) : '');
