import { useMutation } from "react-query";
import { FormEvent, useState } from "react";
import { authFetch } from "../utils";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContext, Error } from "../shared/interfaces";
import { Link } from "react-router-dom";
import { getAuthFetch } from "../utils/axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch }: AuthContext = useAuthContext();

  const {
    mutate,
    isError,
    error,
  }: { mutate: () => void; isError: boolean; error: Error | null } =
    useMutation({
      mutationFn: () =>
        getAuthFetch.post("/register", { email, username, password }),
      onSuccess: (data) => {
        localStorage.setItem("token", JSON.stringify(data.data.token));
        authFetch.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
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
        className={`max-w-max alert alert-error flex justify-items-center py-2.5 ${
          !isError && "invisible"
        }`}
      >
        <span className="text-center">{error?.response?.data?.error}</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-neutral shadow-md rounded py-12 px-8 flex flex-col gap-8 max-w-md mt-2.5"
      >
        <div>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            autoComplete="on"
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
            autoComplete="on"
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
            autoComplete="on"
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-secondary btn-wide">
            register
          </button>
        </div>
      </form>
      <Link to="/login" className="text-white text-md mt-5">
        Already a user? Log in
      </Link>
    </div>
  );
}
