export function getDifferenceInDates(f, l) {
  const firstDayOfMonth = new Date(f);
  const lastDayOfMonth = new Date(l);
  const diffTime = Math.abs(lastDayOfMonth - firstDayOfMonth);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
