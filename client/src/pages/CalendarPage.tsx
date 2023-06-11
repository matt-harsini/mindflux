import { Calendar } from "../components";

export default function CalendarPage() {
  return (
    <div className="flex flex-col mx-auto gap-5">
      <h3 className="mx-auto lg:mx-0 text-primary-content text-4xl font-bold">
        Here is your month
      </h3>
      <Calendar />
    </div>
  );
}
