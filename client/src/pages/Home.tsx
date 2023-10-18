import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Loading } from "../components";
import { Features, Footer, Header } from "../components/Home";

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
      <Header />
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
