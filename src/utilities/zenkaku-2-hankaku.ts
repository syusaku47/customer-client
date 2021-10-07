/** 全角から変革への数字の変換 */
export const zenkaku2HankakuNum = (str: string) => str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248));
