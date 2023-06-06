import { useMutation } from "react-query";
import { FormEvent, useState } from "react";
import { authFetch } from "../utils/axios";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: () =>
      authFetch.post("/register", { email, username, password }),
  });

  const { dispatch } = useAuthContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
    if (!isSuccess) {
      console.log(error);
      return;
    }
    localStorage.setItem("token", JSON.stringify(data.data.token));
    dispatch({ type: "LOGIN", payload: data.data.token });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h4 className="text-3xl font-bold text-accent">mindflux</h4>
      <form
        onSubmit={handleSubmit}
        className="bg-neutral shadow-md rounded py-12 px-8 flex flex-col gap-8 max-w-md mt-8"
      >
        <div>
          <input
            placeholder="email"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
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
          <button type="submit" className="btn btn-secondary btn-wide">
            register
          </button>
        </div>
        {isError && (
          <div className="alert alert-error">
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
            <span>{error.response.data.error}</span>
          </div>
        )}
      </form>
    </div>
  );
}
