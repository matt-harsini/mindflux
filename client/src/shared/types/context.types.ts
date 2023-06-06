export type ContextState = {
  user: null | string;
};

export type ContextAction = {
  type: string;
  payload?: unknown;
};

export type ContextValue = {
  state?: ContextState;
  dispatch: React.Dispatch<ContextAction>;
};
