import { createContext, useReducer } from "react";
import { ContextState, ContextAction } from "../shared/types";

const authReducer = (
  state: ContextState,
  action: ContextAction
): ContextState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload as string };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<ContextState | null>(null);
export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};
