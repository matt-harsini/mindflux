export type ContextState = {
  token: null | string;
  isAuth?: boolean;
};

export type ContextAction = {
  type: string;
  payload?: unknown;
};

export type ContextValue = {
  state?: ContextState;
  token?: null | string;
  dispatch: React.Dispatch<ContextAction>;
};
