import { createContext, useReducer } from "react";
import { ContextState, ContextAction, ContextValue } from "../shared/types";
import { useMutation } from "react-query";
import { authFetch } from "../utils";
function authReducer(state: ContextState, action: ContextAction): ContextState {
  switch (action.type) {
    case "LOGIN":
      return { token: action.payload as string };
    case "LOGOUT":
      return { token: null };
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
  console.log("AuthContext state: ", state);
  const { mutate } = useMutation({
    mutationFn: () =>
      authFetch.post("/verify", {
        token: localStorage.getItem("token"),
      }),
    onSuccess: (data) => {
      console.log(data);

      dispatch({ type: "SET_AUTH", payload: data });
    },
  });
  mutate();
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
