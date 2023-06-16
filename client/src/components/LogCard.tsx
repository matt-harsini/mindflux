import { format, parseISO } from "date-fns";
import { colors, inputIcons } from "../theme/icons";
import { ClockIcon } from "@heroicons/react/20/solid";
import { useMutation } from "react-query";
import { authFetch } from "../utils";

export default function LogCard({ log, refetch }: any) {
  const { mutate } = useMutation({
    mutationFn: (id: string) => authFetch.delete(`/delete-log/${id}`),
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div className="card shadow-md relative p-3" key={log._id}>
      <div className="flex items-center justify-between">
        <div>
          {Object.keys(log.moodMeter).map((key, index) => {
            if (log.moodMeter[key] === null) return;
            return (
              <span
                key={index}
                className={`${colors[key]} fa-solid ${
                  inputIcons[key][log.moodMeter[key]]
                } text-3xl ml-0.5`}
              />
            );
          })}
        </div>
        <button type="button" className="rounded-full text-white shadow-sm">
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
      </div>
      <time
        dateTime={log.createdAt.toString()}
        className="mt-2 flex items-center text-gray-300"
      >
        <ClockIcon className="mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
        {format(parseISO(log.createdAt), "haa")}
      </time>
      {log.log !== "" && <p className="text-md text-white mt-4">{log.log}</p>}
    </div>
  );
}
