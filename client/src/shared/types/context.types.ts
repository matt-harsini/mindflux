export type ContextState = {
  user: null | string;
};

export type ContextAction = {
  type: string;
  payload?: unknown;
};

export type ContextValue = {
  state?: ContextState;
  user?: null | string;
  dispatch: React.Dispatch<ContextAction>;
};
