import { Calendar } from "../components";

export default function CalendarPage() {
  return (
    <div className="flex flex-col max-w-[1320px] mx-auto gap-10 px-6 mb-4">
      <h3 className="mx-auto lg:mx-0 text-primary-content text-4xl font-bold">
        Here's your month
      </h3>
      <Calendar />
    </div>
  );
}
