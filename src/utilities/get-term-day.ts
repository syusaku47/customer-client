/**
 * ２つの日付の差分が何日間か返す
 * @returns 何日間
 */
export const getTermDay = (start: Date | null, end: Date | null) => {
  if (start && end) {
    const diff = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24) + 1);
  }
  return undefined;
};
