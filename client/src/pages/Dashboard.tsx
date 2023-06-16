import { useQuery } from "react-query";
import { useAuthContext } from "../hooks/useAuthContext";
import { authFetch } from "../utils";

export default function Dashboard() {
  const { username } = useAuthContext();
  const { data } = useQuery({
    queryFn: () => authFetch.get("/get-logs"),
    onSuccess: (data) => {
      console.log(data);
    },
    queryKey: ["all-logs"],
  });

  return (
    <>
      <h3 className="text-2xl text-center sm:text-3xl mx-auto lg:mx-0 text-primary-content lg:text-4xl font-bold mb-7 sm:text-start">
        Hello {username}
      </h3>
      <div className="flex flex-col mx-auto gap-10"></div>
    </>
  );
}
