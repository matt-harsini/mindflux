import { useMutation } from "react-query";
import { FormEvent, useState } from "react";
import { authFetch } from "../utils";
import { useAuthContext } from "../hooks/useAuthContext";
import { Error } from "../shared/interfaces";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        payload: { token: data.data.token, username: data.data.username },
      });
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
      <div
        className={`max-w-max alert alert-error justify-items-center mt-1.5 py-2.5 ${
          !isError && "invisible"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error?.response.data.error}</span>
      </div>
      <form
        className="bg-neutral shadow-md rounded py-12 px-8 flex flex-col gap-8 max-w-md mt-2.5"
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
      <Link to="/register" className="text-accent text-md mt-5">
        Don't have an account? Sign up
      </Link>
    </div>
  );
}
