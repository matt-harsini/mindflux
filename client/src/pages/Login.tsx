import { useMutation } from "react-query";
import { FormEvent, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Error } from "../shared/interfaces";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/interfaces";
import { getAuthFetch } from "../utils/axios";
import PasswordInput from "../components/PasswordInput";

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
    mutationFn: () => getAuthFetch.post("/login", { username, password }),
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
      <h4 className="text-3xl font-bold text-accent mb-4">mindflux</h4>
      <div
        className={`max-w-max absolute top-10 alert alert-error flex justify-items-center py-2.5 ${
          !isError && "invisible"
        }`}
      >
        <span className="text-center">{error?.response.data.message}</span>
      </div>
      <form
        className="py-6 px-8 pt-8 flex flex-col gap-6 max-w-lg w-full relative"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-2">
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            minLength={8}
            maxLength={30}
            required
            autoComplete="on"
            id="username"
          />
        </div>
        <div className="relative flex flex-col gap-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <Link to="/forgot" className="text-secondary font-bold">
              Forgot password?
            </Link>
          </div>
          <PasswordInput password={password} setPassword={setPassword} />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className={`btn w-full ${
              isLoading ? "btn-disabled" : "btn-secondary"
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
