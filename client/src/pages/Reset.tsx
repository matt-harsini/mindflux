import { useMutation } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { authFetch } from "../utils";
import { useState } from "react";

export default function Reset() {
  const [mounted, hasMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  const { mutate, isSuccess } = useMutation({
    mutationFn: () => authFetch.post(`/verify-token/${token}`),
  });

  if (!mounted) {
    hasMounted(true);
    mutate();
  }

  if (!isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form className="py-6 px-8 pt-8 flex flex-col gap-8 max-w-lg w-full relative">
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
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-secondary w-full">Continue</button>
      </form>
    </div>
  );
}
