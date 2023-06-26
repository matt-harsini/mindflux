import { useState } from "react";
import { useMutation } from "react-query";
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

  const { mutate: resetPassword, isSuccess: isResetSuccess } = useMutation({
    mutationFn: () =>
      authFetch.patch(`/forgot-password/${token}`, {
        password,
        passwordConfirm,
      }),
    mutationKey: [password, passwordConfirm],
  });

  if (!mounted) {
    verifyToken().then(() => hasMounted(true));
  }

  if (isVerifyLoading && !mounted) {
    return <Loading height="h-screen" />;
  }

  if (!isVerifyLoading && isVerifyError) {
    return <Navigate to="/" />;
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
    </div>
  );
}
