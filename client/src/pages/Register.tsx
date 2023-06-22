import { useMutation } from "react-query";
import { FormEvent, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContext, Error } from "../shared/interfaces";
import { Link } from "react-router-dom";
import { getAuthFetch } from "../utils/axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        <span className="text-center">{error?.response?.data?.message}</span>
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            autoComplete="on"
          />
          <button
            className="scale-[0.8] absolute top-3 right-3"
            type="button"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
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
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          </button>
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
