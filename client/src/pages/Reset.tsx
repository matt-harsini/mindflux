import { useMutation } from "react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import { authFetch } from "../utils";
import { useState } from "react";
import axios from "axios";

export default function Reset() {
  const [mounted, hasMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();

  const {
    mutate: verifyToken,
    isSuccess: isVerifySuccess,
    isLoading: isVerifyLoading,
  } = useMutation({
    mutationFn: () => axios.post("http://localhost:4000/api/verify-token", { token }),
  });

  console.log(isVerifySuccess, isVerifyLoading);

  const { mutate: resetPassword, isSuccess } = useMutation({
    mutationFn: () =>
      authFetch.patch(`/forgot-password/${token}`, {
        password,
        passwordConfirm,
      }),
  });

  const handleReset = () => {
    resetPassword();
  };

  if (!mounted) {
    hasMounted(true);
    verifyToken();
  }

  if (isSuccess) {
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

  if (!isVerifySuccess && !isVerifyLoading) {
    return <Navigate to="/" />;
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
          <input
            className="input input-bordered w-full"
            type="text"
            id="email"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-white">
            Confirm password
          </label>
          <input
            className="input input-bordered w-full"
            type="text"
            id="email"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleReset}
          type="button"
          className="btn btn-secondary w-full"
        >
          Reset password
        </button>
      </form>
    </div>
  );
}
