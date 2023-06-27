import { createContext, useReducer, useState } from "react";
import { useQuery } from "react-query";
import { authFetch } from "../utils";
import {
  AuthAction,
  AuthState,
  AuthContext as AuthContextType,
} from "../shared/interfaces";

enum AuthActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_AUTH = "SET_AUTH",
}

function authReducer(_state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      authFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      return {
        email: action.payload?.email,
        username: action.payload?.username,
        isAuth: true,
      };
    case AuthActionTypes.LOGOUT:
      delete authFetch.defaults.headers.common["Authorization"];
      return { username: null, isAuth: false, email: null };
    case AuthActionTypes.SET_AUTH:
      authFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      return {
        isAuth: action.payload?.isAuth,
        email: action.payload?.email,
        username: action.payload?.username,
      };
  }
  throw new Error(`No matching ${action.type}`);
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, {
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    isAuth: false,
  });
  const [mount, setMount] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  console.log("AuthContext state: ", state);
  const { refetch } = useQuery({
    queryFn: () =>
      authFetch.get("/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    onSuccess: (data) => {
      setIsFetching(false);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuth: data.data.authorized,
          username: data.data.username,
          email: data.data.email,
        },
      });
    },
    queryKey: ["auth"],
  });
  if (!mount) {
    refetch();
    setMount(true);
  }
  return (
    <AuthContext.Provider value={{ ...state, dispatch, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};
