import { createContext, useReducer, useState } from "react";
import { useMutation } from "react-query";
import { authFetch } from "../utils";
import { AuthAction, AuthState, AuthContext as AuthContextType } from "../shared/interfaces";

enum AuthActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_AUTH = "SET_AUTH",
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        email: action.payload?.email,
        username: action.payload?.username,
        isAuth: true,
      };
    case AuthActionTypes.LOGOUT:
      return { username: null, isAuth: false, email: null };
    case AuthActionTypes.SET_AUTH:
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
    isAuth: false,
  });
  const [mount, setMount] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  console.log("AuthContext state: ", state);
  const { mutate } = useMutation({
    mutationFn: () => authFetch.get("/verify"),
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
  });
  if (!mount) {
    mutate();
    setMount(true);
  }
  return (
    <AuthContext.Provider value={{ ...state, dispatch, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};
