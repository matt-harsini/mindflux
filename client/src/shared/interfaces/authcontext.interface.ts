interface AuthState {
  email: string | null | undefined;
  username: string | null | undefined;
  isAuth: boolean | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  phoneNumber?: string | null | undefined;
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
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  dispatch: React.Dispatch<AuthAction>;
}

export type { AuthAction, AuthState, AuthContext };
