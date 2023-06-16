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
      <div className="flex items-center justify-start">
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
      <time
        dateTime={log.createdAt.toString()}
        className="mt-2 flex items-center text-gray-300"
      >
        <ClockIcon className="mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
        {format(parseISO(log.createdAt), "haa")}
      </time>
      {log.log !== "" && <p className="text-md text-white mt-4">{log.log}</p>}
      <button
        onClick={() => mutate(log._id)}
        className="btn btn-accent absolute top-2 right-2"
      >
        Remove<span className="sr-only">, {log.log}</span>
      </button>
    </div>
  );
}
