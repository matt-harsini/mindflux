import { Calendar } from "../components";

export default function CalendarPage() {
  return (
    <>
      <h3 className="text-center mx-auto lg:mx-0 text-primary-content text-4xl font-bold mb-8 xl:text-start">
        Here is your month
      </h3>
      <div className="flex flex-col mx-auto gap-10">
        <Calendar />
      </div>
    </>
  );
}
