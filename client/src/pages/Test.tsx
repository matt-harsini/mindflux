import { useMutation } from "react-query";
import { authFetch } from "../utils";
import { useParams } from "react-router-dom";

export default function Test() {
  const { token } = useParams();
  const { mutate, isError, isLoading, isSuccess } = useMutation({
    mutationFn: () => authFetch.post("/verify-token", { token: 123 }),
  });

  console.log(isError, isLoading, isSuccess);

  return (
    <div>
      <button onClick={() => mutate()} className="btn btn-secondary">
        Click me
      </button>
    </div>
  );
}
