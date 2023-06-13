import { useMutation } from "react-query";
import { FormEvent, useState } from "react";
import { authFetch } from "../utils";
import { useAuthContext } from "../hooks/useAuthContext";
import { Error } from "../shared/interfaces";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/interfaces";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch }: AuthContext = useAuthContext();
  const {
    error,
    mutate,
    isLoading,
    isError,
  }: {
    error: Error | null;
    mutate: () => void;
    isLoading: boolean;
    isError: boolean;
  } = useMutation({
    mutationFn: () => authFetch.post("/login", { username, password }),
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data.data.token));
      dispatch({
        type: "LOGIN",
        payload: {
          isAuth: true,
          username: data.data.username,
          email: data.data.email,
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };
  const { isAuth, isFetching } = useAuthContext();

  if (!isAuth && localStorage.getItem("token") && isFetching) {
    return <div />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h4 className="text-3xl font-bold text-accent">mindflux</h4>
      <div
        className={`max-w-max alert alert-error flex justify-items-center mt-1 py-2.5 ${
          !isError && "invisible"
        }`}
      >
        <span className="text-center">{error?.response.data.error}</span>
      </div>
      <form
        className="bg-neutral shadow-md rounded py-12 px-8 flex flex-col gap-8 max-w-md mt-1"
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
      <Link to="/register" className="text-white text-md mt-5">
        Don't have an account? Sign up
      </Link>
    </div>
  );
}
