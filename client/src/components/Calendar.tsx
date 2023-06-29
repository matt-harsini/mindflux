/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";
import {
  add,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  formatISO,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  lastDayOfMonth,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { authFetch } from "../utils";
import { colors, inputIcons, progressColors } from "../theme";
import { Link } from "react-router-dom";
import { Slideover } from ".";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const colStartClasses = [
  "col-start-7",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];

const MAX_CALENDAR_DAYS = 41;

export default function Calendar() {
  const [clicked, setClicked] = useState(false);
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const start = startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 });
  const end = endOfMonth(firstDayCurrentMonth);
  const difference = differenceInDays(end, start);
  const firstDateOfMonth = formatISO(firstDayCurrentMonth);
  const lastDateOfMonth = formatISO(lastDayOfMonth(firstDayCurrentMonth));
  const [open, setOpen] = useState(false);
  const newDays = eachDayOfInterval({
    start,
    end: add(end, { days: MAX_CALENDAR_DAYS - difference }),
  });

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function previousMonth() {
    const firstDayLastMonth = sub(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayLastMonth, "MMM-yyyy"));
  }

  function resetMonth() {
    setCurrentMonth(format(today, "MMM-yyyy"));
  }

  const data: any = useQuery({
    queryFn: () =>
      authFetch.get(`/query?f=${firstDateOfMonth}&l=${lastDateOfMonth}`),
    queryKey: [currentMonth],
  });

  const { mutate } = useMutation({
    mutationFn: (id: string) => authFetch.delete(`/delete-log/${id}`),
    onSuccess: () => {
      data.refetch().then(() => setClicked(true));
    },
  });

  return (
    <>
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="flex items-center justify-between border-base-300 px-6 py-4 lg:flex-none bg-base-200 rounded-md">
          <h1 className="font-semibold leading-6 text-primary-content text-md lg:text-xl xl:text-2xl">
            <time dateTime="2022-01">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </time>
          </h1>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-lg bg-accent shadow-sm md:items-stretch">
              <button
                type="button"
                className="btn btn-accent flex gap-2 p-2"
                onClick={previousMonth}
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hidden px-3.5 text-sm font-semibold text-primary-content bg-accent uppercase focus:relative md:block"
                onClick={resetMonth}
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="btn btn-accent flex gap-2 p-2"
                onClick={nextMonth}
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden md:flex md:items-center">
              <div className="ml-6 h-6 w-px bg-gray-300" />
              <Link to="/dashboard/log" className="ml-6 btn btn-accent">
                Log mood
              </Link>
            </div>
          </div>
        </header>
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col rounded-md">
          <div className="grid grid-cols-7 gap-px border-b border-base-300 text-center text-xs font-semibold leading-6 text-primary-content lg:flex-none bg-base-300">
            <div className="bg-base-100 py-2">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="bg-base-100 py-2">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="bg-base-100 py-2">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="bg-base-100 py-2">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="bg-base-100 py-2">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="bg-base-100 py-2">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
            <div className="bg-base-100 py-2">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
          </div>
          <div className="flex bg-base-100 rounded-md text-xs leading-6 text-primary-content lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px bg-base-300 rounded-md">
              {newDays.map((day, i) => (
                <div
                  key={day.toString()}
                  onClick={() => {
                    if (isSameMonth(day, firstDayCurrentMonth)) {
                      setOpen(true);
                      setSelectedDay(day);
                    }
                  }}
                  className={classNames(
                    isSameMonth(day, firstDayCurrentMonth)
                      ? "bg-base-100"
                      : "bg-base-200 text-gray-400",
                    i === 35 ? "rounded-bl-md" : "",
                    i === 41 ? "rounded-br-md" : "",
                    `relative px-3 py-2${
                      i === 0 ? colStartClasses[getDay(day)] : ""
                    }`,
                    "h-[106px] hover:cursor-pointer hover:bg-base-300"
                  )}
                >
                  <div className="flex justify-between">
                    <time
                      dateTime={day.toString()}
                      className={
                        isToday(day)
                          ? "flex h-6 w-6 items-center justify-center rounded-full bg-accent font-semibold text-white"
                          : undefined
                      }
                    >
                      {format(day, "d")}
                    </time>
                    {data.status !== "loading" &&
                      data?.data?.data &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      !!data.data.data.payload?.length &&
                      data.data.data.payload[new Date(day).getDate() - 1]
                        ?.length > 2 && (
                        <li className="text-gray-500 list-none">
                          +{" "}
                          {data.data.data.payload[new Date(day).getDate() - 1]
                            .length - 2}{" "}
                          more
                        </li>
                      )}
                  </div>
                  {data.status !== "loading" &&
                    data?.data?.data &&
                    !!data.data.data.payload?.length &&
                    !!data.data.data.payload[new Date(day).getDate() - 1]
                      ?.length &&
                    isSameMonth(day, firstDayCurrentMonth) && (
                      <ol className="mt-2">
                        {data.data.data.payload[new Date(day).getDate() - 1]
                          .slice(0, 2)
                          .map((log: any) => {
                            return (
                              <li key={log._id}>
                                <a className="group flex items-center">
                                  <p className="flex-auto truncate font-medium text-primary-content group-hover:text-accent">
                                    {Object.keys(log.moodMeter).map(
                                      (key, index) => {
                                        if (log.moodMeter[key] === null) return;
                                        return (
                                          <span
                                            key={log._id + index}
                                            className={`${
                                              colors[key]
                                            } fa-solid ${
                                              inputIcons[key][
                                                log.moodMeter[key]
                                              ]
                                            } text-lg ml-0.5`}
                                          />
                                        );
                                      }
                                    )}
                                  </p>
                                  <time
                                    dateTime={log.createdAt.toString()}
                                    className="ml-3 hidden flex-none text-gray-300 group-hover:text-accent xl:block"
                                  >
                                    {format(parseISO(log.createdAt), "haa")}
                                  </time>
                                </a>
                              </li>
                            );
                          })}
                      </ol>
                    )}
                </div>
              ))}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden bg-base-300">
              {newDays.map((day) => (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDay(day)}
                  type="button"
                  className={classNames(
                    isSameMonth(day, firstDayCurrentMonth)
                      ? "bg-base-100"
                      : "bg-base-200",
                    (isEqual(day, selectedDay) || isEqual(day, selectedDay)) &&
                      "font-semibold",
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isEqual(day, selectedDay) &&
                      "text-accent",
                    !isEqual(day, selectedDay) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      !isEqual(day, selectedDay) &&
                      "text-primary-content",
                    !isEqual(day, selectedDay) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      !isEqual(day, selectedDay) &&
                      "text-gray-500",
                    "flex h-[72px] flex-col px-3 py-2 hover:bg-base-300 focus:primary-content"
                  )}
                >
                  <time
                    dateTime={day.toString()}
                    className={classNames(
                      isEqual(day, selectedDay) &&
                        "flex h-6 w-6 items-center justify-center rounded-full",
                      isEqual(day, selectedDay) && isToday(day) && "bg-accent",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-secondary",
                      "ml-auto"
                    )}
                  >
                    {format(day, "d")}
                  </time>
                  {isSameMonth(day, firstDayCurrentMonth) &&
                    data.status !== "loading" &&
                    data?.data?.data &&
                    !!data.data.data?.payload[new Date(day).getDate() - 1]
                      ?.length && (
                      <span className="sr-only">
                        {
                          data.data.data.payload[new Date(day).getDate() - 1]
                            .length
                        }
                        events
                      </span>
                    )}
                  {isSameMonth(day, firstDayCurrentMonth) &&
                    data.status !== "loading" &&
                    data?.data?.data &&
                    !!data.data.data.payload[new Date(day).getDate() - 1]
                      .length && (
                      <span className="relative top-2 right-1.5">
                        {data.data.data.payload[new Date(day).getDate() - 1]
                          .slice(0, 1)
                          .map((log: any) => {
                            return (
                              <span
                                key={log._id}
                                className="-mx-0.5 mt-auto flex flex-wrap-reverse relative"
                              >
                                {Object.keys(log.moodMeter).map(
                                  (key, index) => {
                                    if (log.moodMeter[key] === null) return;
                                    return (
                                      <span
                                        key={log._id + index}
                                        className={`${colors[key]} fa-solid ${
                                          inputIcons[key][log.moodMeter[key]]
                                        } text-md ml-0.5`}
                                      />
                                    );
                                  }
                                )}
                              </span>
                            );
                          })}
                      </span>
                    )}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-base-300 overflow-hidden rounded-lg bg-base-100 text-sm shadow ring-1 ring-black ring-opacity-5">
            {isSameMonth(selectedDay, firstDayCurrentMonth) &&
              data.status !== "loading" &&
              data?.data?.data &&
              !!data.data.data.payload[
                new Date(formatISO(selectedDay)).getDate() - 1
              ].length &&
              data.data.data.payload[
                new Date(formatISO(selectedDay)).getDate() - 1
              ].map((log: any) => {
                return (
                  <li
                    key={log._id}
                    className="group flex p-4 pr-6 focus-within:bg-base-300 hover:bg-base-300"
                  >
                    <div className="flex-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-2">
                          {Object.keys(log.moodMeter).map((key, index) => {
                            if (log.moodMeter[key] === null) return;
                            return (
                              <div
                                key={index}
                                className="flex items-center gap-x-4"
                              >
                                <span
                                  className={`${colors[key]} fa-solid ${
                                    inputIcons[key][log.moodMeter[key]]
                                  } text-3xl ml-0.5`}
                                />
                                <progress
                                  className={`progress w-56 ${progressColors[key]} ${colors[key]} bg-gray-700`}
                                  value={log.moodMeter[key] * 20}
                                  max="100"
                                ></progress>
                              </div>
                            );
                          })}
                        </div>
                        {clicked ? (
                          <span className="loading loading-spinner loading-md self-start" />
                        ) : (
                          <button
                            type="button"
                            className="rounded-full text-white shadow-sm self-start"
                            onClick={() => {
                              setClicked(true);
                              mutate(log._id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                      <time
                        dateTime={log.createdAt.toString()}
                        className="mt-2 flex items-center text-gray-300"
                      >
                        <ClockIcon
                          className="mr-2 h-5 w-5 text-gray-300"
                          aria-hidden="true"
                        />
                        {format(parseISO(log.createdAt), "haa")}
                      </time>
                      {log.log !== "" && (
                        <p className="text-md text-white mt-4">{log.log}</p>
                      )}
                    </div>
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
      {data.status !== "loading" && (
        <Slideover
          open={open}
          setOpen={setOpen}
          data={data?.data?.data?.payload[new Date(selectedDay).getDate() - 1]}
          refetch={data.refetch}
        />
      )}
    </>
  );
}
