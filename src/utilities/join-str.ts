/**
 * 指定位置に文字を挿入する
 * @param {(string | number)} str 対象文字列
 * @param {number} index 挿入ヶ所
 * @param {(string | number)} val 挿入文字列
 */
export const joinStr = (
  str: string | number, index: number, val: string | number,
) => (str || str === 0 ? String(str).slice(0, index) + val + String(str).slice(index) : '');
