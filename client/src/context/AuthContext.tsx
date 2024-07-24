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
  SET_DATA = "SET_DATA",
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      authFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      return {
        notifyLog: action.payload?.notifyLog,
        notifyCalendar: action.payload?.notifyCalendar,
        phoneNumber: action.payload?.phoneNumber,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        isAuth: action.payload?.isAuth,
        email: action.payload?.email,
        username: action.payload?.username,
      };
    case AuthActionTypes.LOGOUT:
      delete authFetch.defaults.headers.common["Authorization"];
      return {
        username: null,
        isAuth: false,
        email: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        notifyCalendar: null,
        notifyLog: null,
      };
    case AuthActionTypes.SET_AUTH:
      authFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      return {
        isAuth: action.payload?.isAuth,
        email: action.payload?.email,
        username: action.payload?.username,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        phoneNumber: action.payload?.phoneNumber,
        notifyLog: action.payload?.notifyLog,
        notifyCalendar: action.payload?.notifyCalendar,
      };
    case AuthActionTypes.SET_DATA:
      return {
        ...state,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        phoneNumber: action.payload?.phoneNumber,
      };
  }
  throw new Error(`No matching ${action.type}`);
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [retry, setRetry] = useState(false);
  const [state, dispatch] = useReducer(authReducer, {
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    isAuth: false,
    notifyCalendar: null,
    notifyLog: null,
  });
  const [isFetching, setIsFetching] = useState(true);
  const { isLoading, refetch } = useQuery({
    queryFn: () => {
      return authFetch.get("/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: (data) => {
      setIsFetching(false);
      dispatch({
        type: "SET_AUTH",
        payload: {
          phoneNumber: data.data.phoneNumber,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          isAuth: data.data.authorized,
          username: data.data.username,
          email: data.data.email,
          notifyLog: data.data.notifyLog,
          notifyCalendar: data.data.notifyCalendar,
        },
      });
    },
    queryKey: ["auth"],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false,
  });

  if (localStorage.getItem("token") && !retry) {
    refetch();
    setRetry(true);
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isFetching, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
