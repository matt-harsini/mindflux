import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h4 className="text-3xl font-bold text-accent">mindflux</h4>
      <form className="bg-neutral shadow-md rounded py-12 px-8 flex flex-col gap-8 max-w-md mt-8">
        <div>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-secondary btn-wide">
            register
          </button>
        </div>
      </form>
    </div>
  );
}
