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
  state?: ContextState;
  dispatch: Dispatch<ContextAction>;
};
