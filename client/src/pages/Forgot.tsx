import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { authFetch } from "../utils";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const { mutate, status } = useMutation({
    mutationFn: () => authFetch.post("/forgot-password", { email }),
  });

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };
  
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
