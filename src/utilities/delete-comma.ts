export const deleteComma = (targetStr: string | number = '') => (targetStr ? Number(String(targetStr).replace(/,/g, '')) || 0 : 0);
