import jwt from "jsonwebtoken";

export function getDifferenceInDates(f, l) {
  const firstDayOfMonth = new Date(f);
  const lastDayOfMonth = new Date(l);
  const diffTime = Math.abs(lastDayOfMonth - firstDayOfMonth);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}
