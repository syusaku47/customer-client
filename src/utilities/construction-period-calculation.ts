export const constructionPeriodCalculation = (
  startDate: Date | null, endDate: Date | null, termDay: number,
) => {
  if (!termDay || !startDate) return endDate;

  const day = termDay - 1;
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return new Date(startDate.getTime() + day * millisecondsPerDay);
};
