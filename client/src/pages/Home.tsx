import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Loading } from "../components";
import { Features, Footer } from "../components/Home";

export default function Home() {
  const navigate = useNavigate();
  const { isAuth, isFetching, isLoading: isAuthLoading } = useAuthContext();

  if (!isAuth && localStorage.getItem("token") && isFetching) {
    return <div />;
  }

  if (isAuthLoading) {
    return <Loading height="h-screen" />;
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
      <Features />
      <div className="bg-base-200">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Gain valuable insight.
              <br />
              Start using our app today for free.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
              Create an account and verify your email to start tracking your
              mood.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="text-sm font-semibold leading-6 text-white"
              >
                Log in <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
