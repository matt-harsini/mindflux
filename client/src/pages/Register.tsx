import { useMutation } from "react-query";
import { FormEvent, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Error } from "../shared/interfaces";
import { Link } from "react-router-dom";
import { getAuthFetch } from "../utils/axios";
import PasswordInput from "../components/PasswordInput";
import { Loading } from "../components";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate,
    isError,
    isLoading,
    error,
    isSuccess,
  }: {
    mutate: () => void;
    isError: boolean;
    error: Error | null;
    isLoading: boolean;
    isSuccess: boolean;
  } = useMutation({
    mutationFn: () =>
      getAuthFetch.post("/register", { email, username, password }),
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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="mt-4 text-lg lg:text-xl font-bold tracking-tight text-white sm:text-5xl">
          Success!
        </h1>
        <h4 className="text-sm md:text-lg text-white text-center mt-2">
          Please check your email to verify your account
        </h4>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md uppercase bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error(error?.response.data.message, { toastId: "register_error" });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h4 className="text-3xl font-bold text-accent mb-4">mindflux</h4>
      <form
        className="py-6 px-8 pt-8 flex flex-col gap-6 max-w-lg w-full relative"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            minLength={8}
            maxLength={30}
            required
            autoComplete="on"
            id="email"
          />
        </div>
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
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <PasswordInput password={password} setPassword={setPassword} />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className={`btn ${
              isLoading ? "btn-disabled" : "btn-secondary"
            }  w-full`}
          >
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
