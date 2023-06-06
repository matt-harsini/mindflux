import { useMutation } from "react-query";
import { FormEvent, useState } from "react";
import { authFetch } from "../utils/axios";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: () => authFetch.post("/login", { username, password }),
    onSuccess: async (data) => {
      localStorage.setItem("token", JSON.stringify(data.data.token));
      dispatch({ type: "LOGIN", payload: data.data.token });
    },
  });
  const { dispatch } = useAuthContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h4 className="text-3xl font-bold text-accent">mindflux</h4>
      <form
        className="bg-neutral shadow-md rounded py-12 px-8 flex flex-col gap-8 max-w-md mt-8"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            placeholder="username"
            className="input input-bordered w-full max-w-xs"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            minLength={8}
            maxLength={30}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className={`btn btn-secondary btn-wide ${
              isLoading ? "btn-disabled" : ""
            }`}
          >
            log in
          </button>
        </div>
      </form>
    </div>
  );
}
