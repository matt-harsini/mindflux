import { createContext, useReducer, useState } from "react";
import { ContextState, ContextAction, ContextValue } from "../shared/types";
import { useMutation } from "react-query";
import { authFetch } from "../utils";

function authReducer(state: ContextState, action: ContextAction): ContextState {
  switch (action.type) {
    case "LOGIN":
      return { token: action.payload as string, isAuth: true };
    case "LOGOUT":
      return { token: null, isAuth: false };
    case "SET_AUTH":
      return { ...state, isAuth: action.payload as boolean };
    default:
      return state;
  }
}

export const AuthContext = createContext<ContextValue | null>(null);
export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: localStorage.getItem("token") || null,
  });
  const [mount, setMount] = useState(false);
  console.log("AuthContext state: ", state);
  const { mutate } = useMutation({
    mutationFn: () =>
      authFetch.post("/verify", {
        token: localStorage.getItem("token"),
      }),
    onSuccess: (data) => {
      dispatch({ type: "SET_AUTH", payload: data.data.authorized });
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
