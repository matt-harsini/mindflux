import { useMutation } from "react-query";
import { FormEvent, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Error } from "../shared/interfaces";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/interfaces";
import { getAuthFetch } from "../utils/axios";
import PasswordInput from "../components/PasswordInput";
import { Loading } from "../components";
import { toast } from "react-toastify";

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
          phoneNumber: data.data.phoneNumber,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          notifyLog: data.data.notifyLog,
          notifyCalendar: data.data.notifyCalendar,
        },
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };
  const { isAuth, isFetching, isLoading: isAuthLoading } = useAuthContext();

  useEffect(() => {
    return () => {
      toast.dismiss();
      toast.clearWaitingQueue();
    };
  }, []);

  if (!isAuth && localStorage.getItem("token") && isFetching) {
    return <div />;
  }

  if (isAuthLoading) {
    return <Loading height="h-screen" />;
  }

  if (isError) {
    toast.error(error?.response.data.message, { toastId: "login_error" });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h4 className="text-3xl font-bold text-accent mb-4">mindflux</h4>
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
            <Link to="/forgot" className="text-accent font-bold">
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
