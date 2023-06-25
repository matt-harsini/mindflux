import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { authFetch } from "../utils";
import { Link } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const { mutate, isSuccess } = useMutation({
    mutationFn: () => authFetch.post("/forgot-password", { email }),
  });

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };

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
          />
        </div>
        <button className="btn btn-secondary w-full">Continue</button>
      </form>
    </div>
  );
}
