export const getTodayUTC7 = () => {
  const now = new Date();
  const utc7 = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  return utc7.toISOString().split("T")[0];
};

export const getLastWeekRange = () => {
  const now = new Date();
  now.setDate(now.getDate() - 7);

  const monday = new Date(now);
  const day = monday.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  monday.setDate(monday.getDate() + diff);
  monday.setUTCHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setUTCHours(23, 59, 59, 999);

  return { start: monday.toISOString(), end: sunday.toISOString() };
};
