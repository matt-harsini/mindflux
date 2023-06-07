import { createContext, useReducer, useState } from "react";
import { useMutation } from "react-query";
import { authFetch } from "../utils";
import { ContextState, ContextAction, ContextValue } from "../shared/types";

function authReducer(state: ContextState, action: ContextAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.payload.token,
        username: action.payload.username,
        isAuth: true,
      };
    case "LOGOUT":
      return { token: null, username: null, isAuth: false };
    case "SET_AUTH":
      return {
        ...state,
        isAuth: action.payload.isAuth,
        username: action.payload.username,
      };
    default:
      return state;
  }
}

export const AuthContext = createContext<ContextValue | null>(null);
export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const token = localStorage.getItem("token") || null;
  const [state, dispatch] = useReducer(authReducer, {
    token,
    username: null,
    isAuth: false,
  });
  const [mount, setMount] = useState(false);
  console.log("AuthContext state: ", state);
  const { mutate } = useMutation({
    mutationFn: () =>
      authFetch.post("/verify", {
        token: localStorage.getItem("token"),
      }),
    onSuccess: (data) => {
      dispatch({
        type: "SET_AUTH",
        payload: {
          token,
          isAuth: data.data.authorized,
          username: data.data.username,
        },
      });
    },
  });
  if (!mount) {
    setMount(true);
    mutate();
  }
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
