const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const date = new Date();

export const getDate = () => {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const getDays = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getDaysInArray = (year: number, month: number) => {
  const array: number[] = [];
  for (let i = 0; i < getDays(year, month); i++) {
    array.push(i);
  }
  return array;
};
