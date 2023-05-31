import { getDaysInArray } from "../utils/dates";

export default function Calendar() {
  const date = getDaysInArray(2023, 5);
  return (
    <div>
      <div className="grid grid-cols-7">
        {date.map((el) => {
          return <div>{el + 1}</div>;
        })}
      </div>
    </div>
  );
}
