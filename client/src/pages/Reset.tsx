/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { UseMutateFunction, useMutation } from "react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import { authFetch } from "../utils";
import { Loading } from "../components";
import PasswordInput from "../components/PasswordInput";

export default function Reset() {
  const [mounted, hasMounted] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const {
    mutateAsync: verifyToken,
    isError: isVerifyError,
    isLoading: isVerifyLoading,
  } = useMutation({
    mutationFn: () => authFetch.post("/verify-token", { token }),
  });

  const {
    mutate: resetPassword,
    isSuccess: isResetSuccess,
    error,
    isError: isResetError,
    isLoading: isResetLoading,
  }: {
    isLoading: boolean;
    error: any;
    isError: boolean;
    isSuccess: boolean;
    mutate: UseMutateFunction;
  } = useMutation({
    mutationFn: () =>
      authFetch.patch(`/forgot-password/${token}`, {
        password,
        passwordConfirm,
      }),
    mutationKey: [password, passwordConfirm],
  });

  useEffect(() => {
    verifyToken().then(() => hasMounted(true));
  }, [verifyToken]);

  if (!mounted || !isVerifyLoading) {
    return <Loading height="h-screen" />;
  }

  if (isResetLoading && !isResetError) {
    return <Loading height="h-screen" />;
  }

  if (!isVerifyLoading && isVerifyError) {
    return (
      <div className="flex flex-col justify-items items-center h-screen">
        <h4 className="text-white text-lg">Page not found</h4>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  if (isResetSuccess) {
    return (
      <div className="min-h-screen flex flex-col gap-y-6 items-center justify-center">
        <h4 className="text-3xl font-bold text-accent mb-4">mindflux</h4>
        <h1 className="text-white text-lg max-w-xl text-center">
          Password successfully reset, please login
        </h1>
        <Link to="/login" className="btn btn-accent">
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div
        className={`max-w-max alert alert-error flex justify-items-center py-2.5 ${
          !isError && "invisible"
        }`}
      >
        <span className="text-center">{error?.response?.data.message}</span>
      </div>
      <form className="py-6 px-8 pt-8 flex flex-col gap-8 max-w-lg w-full relative">
        <div>
          <h4 className="text-white text-2xl font-semibold">
            Getting back into your moodflux account
          </h4>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-white">
            Enter new password
          </label>
          <PasswordInput password={password} setPassword={setPassword} />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-white">
            Confirm password
          </label>
          <PasswordInput
            password={passwordConfirm}
            setPassword={setPasswordConfirm}
            type="confirmPassword"
          />
        </div>
        <button
          onClick={() => resetPassword()}
          type="button"
          className="btn btn-secondary w-full"
        >
          Reset password
        </button>
      </form>
      <Link to="/" className="text-white text-md mt-5">
        Back to home
      </Link>
    </div>
  );
}
