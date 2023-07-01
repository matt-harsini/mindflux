import { Link, useLocation } from "react-router-dom";
import { getAuthFetch } from "../utils/axios";
import { useMutation } from "react-query";
import { Loading } from "../components";
import { useEffect, useState } from "react";

function useQuery() {
  const query = new URLSearchParams(useLocation().search);
  return { verificationToken: query.get("token"), email: query.get("email") };
}

export default function VerifyEmail() {
  const { verificationToken, email } = useQuery();
  const [isFetching, setIsFetching] = useState(true);
  const { isError, mutate } = useMutation({
    mutationFn: () =>
      getAuthFetch.post("/verify-email", {
        verificationToken,
        email,
      }),
    onSuccess: () => {
      setIsFetching(false);
    },
    onError: () => {
      setIsFetching(false);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isFetching) {
    return <Loading height="h-screen" />;
  }

  if (isError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h4 className="text-sm md:text-lg text-white text-center mt-2">
          Invalid session, please try again.
        </h4>
        <Link to="/" className="btn btn-accent mt-4">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="mt-4 text-lg lg:text-xl font-bold tracking-tight text-white sm:text-5xl">
        Success!
      </h1>
      <h4 className="text-sm md:text-lg text-white text-center mt-2">
        Your account is now verified.
      </h4>
      <Link to="/login" className="btn btn-accent mt-8">
        Please log in
      </Link>
    </div>
  );
}
