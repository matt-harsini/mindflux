interface AuthState {
  email: string | null | undefined;
  username: string | null | undefined;
  isAuth: boolean | undefined;
}

interface AuthAction {
  type: string;
  payload?: AuthState | undefined;
}

interface AuthContext {
  isFetching: boolean;
  isAuth: boolean | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  dispatch: React.Dispatch<AuthAction>;
}

export type { AuthAction, AuthState, AuthContext };
