import { Dispatch } from "react";

export type ContextState = {
  isAuth: boolean;
  username: string | null;
  token: string | null;
};

export type ContextAction = {
  type: string;
  payload: {
    isAuth: boolean;
    username: string | null;
    token: string | null;
  };
};

export type ContextValue = {
  isAuth: boolean;
  username: string | null;
  token: string | null;
  dispatch: Dispatch<ContextAction>;
};
