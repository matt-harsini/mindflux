/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { UseMutateFunction, useMutation } from "react-query";
import { authFetch } from "../utils";
import { Link } from "react-router-dom";
import { Loading } from "../components";
import { toast } from "react-toastify";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const {
    mutate,
    isSuccess,
    isLoading,
    isError,
    error,
  }: {
    mutate: UseMutateFunction;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    error: any;
  } = useMutation({
    mutationFn: () => authFetch.post("/forgot-password", { email }),
  });

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };

  useEffect(() => {
    return () => {
      toast.dismiss();
      toast.clearWaitingQueue();
    };
  }, []);

  if (isLoading) {
    return <Loading height="min-h-screen" />;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col gap-y-6 items-center justify-center">
        <h4 className="text-3xl font-bold text-accent mb-4">mindflux</h4>
        <h1 className="text-white text-lg max-w-xl text-center">
          An email has been sent to reset your password <br />
          with an expiry of 10 minutes. Click on the link provided to proceed.
        </h1>
        <Link to="/" className="btn btn-accent">
          Back to home
        </Link>
      </div>
    );
  }

  if (isError) {
    toast.error(error?.response.data.message, { toastId: "forgot_error" });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
        className="py-6 px-8 pt-8 flex flex-col gap-8 max-w-lg w-full relative"
        onSubmit={handleEmailSubmit}
      >
        <div>
          <h4 className="text-white text-2xl font-semibold">
            Getting back into your moodflux account
          </h4>
          <h5 className="text-lg mt-1.5">
            Tell us some information about your account
          </h5>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-white">
            Enter email
          </label>
          <input
            className="input input-bordered w-full"
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <button className="btn btn-secondary w-full">Continue</button>
      </form>
      <Link to="/login" className="text-white text-md mt-5">
        Go back
      </Link>
    </div>
  );
}
