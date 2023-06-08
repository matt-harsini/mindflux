import { createContext, useReducer, useState } from "react";
import { useMutation } from "react-query";
import { authFetch } from "../utils";

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        email: action.payload.email,
        username: action.payload.username,
        isAuth: true,
      };
    case "LOGOUT":
      return { username: null, isAuth: false, email: null };
    case "SET_AUTH":
      return {
        isAuth: action.payload.isAuth,
        email: action.payload.email,
        username: action.payload.username,
      };
    default:
      return state;
  }
}

export const AuthContext = createContext(null);
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
