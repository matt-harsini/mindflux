import { createContext, useReducer } from "react";
import { ContextState, ContextAction, ContextValue } from "../shared/types";

function authReducer(state: ContextState, action: ContextAction): ContextState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload as string };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

export const AuthContext = createContext<ContextValue | null>(null);
export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.stringify(localStorage.getItem("token")) || null,
  });
  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
