const week = ['日', '月', '火', '水', '木', '金', '土'];

/** 当日の日付情報 */
export const getNowDate = () => {
  const today = new Date();
  return {
    date: today,
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    dayOfWeek: week[today.getDay()],
    hour: today.getHours(),
    min: today.getMinutes(),
    seconds: today.getSeconds(),
  };
};
