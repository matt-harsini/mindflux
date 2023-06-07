import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import {Loading} from "../components";

export default function Home() {
  const navigate = useNavigate();
  const { isAuth } = useAuthContext();

  if (!isAuth && localStorage.getItem("token")) {
    return <Loading />;
  }

  return (
    <>
      <header className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-accent">mindflux</h1>
            <p className="py-6 text-2xl text-primary-content">
              navigate your emotional journey <br /> one day at a time
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </button>
            <span className="text-primary-content">or</span>
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate("/register");
              }}
            >
              get started
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
