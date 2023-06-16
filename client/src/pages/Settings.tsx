import { useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { SettingsActionType } from "../shared/types";
import { SettingsAction, SettingsState } from "../shared/interfaces";
import { AuthContext } from "../shared/interfaces";
import { authFetch } from "../utils";

function reducer(state: SettingsState, action: SettingsAction) {
  switch (action.type) {
    case SettingsActionType.FIRST_NAME:
      return { ...state, firstName: action.payload };
    case SettingsActionType.LAST_NAME:
      return { ...state, lastName: action.payload };
    case SettingsActionType.EMAIL:
      return { ...state, email: action.payload };
    case SettingsActionType.PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
  }
  throw new Error(`No matching ${action.type}`);
}

export default function Settings() {
  const { dispatch: authDispatch }: AuthContext = useAuthContext();
  const handleLogout = () => {
    localStorage.removeItem("token");
    delete authFetch.defaults.headers.common["Authorization"];
    authDispatch({
      type: "LOGOUT",
    });
  };
  const { username, email: initialEmail } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    email: initialEmail as string,
    phoneNumber: "",
  });

  return (
    <>
      <h3 className="text-2xl sm:text-3xl mx-auto lg:mx-0 text-primary-content lg:text-4xl font-bold mb-7 text-start">
        Settings
      </h3>
      <div className="flex flex-col mx-auto gap-10">
        <form className="flex flex-col gap-3">
          <div className="lg:max-w-[70%] flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-primary-content" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className="input bg-base-200 input-bordered text-primary-content"
                type="text"
                value={username as string}
                readOnly
              />
            </div>
          </div>
          <div className="divider" />
          <div className="lg:max-w-[70%] flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-primary-content" htmlFor="first-name">
                First Name
              </label>
              <input
                id="first-name"
                className="input bg-base-200 input-bordered text-primary-content"
                type="text"
                value={state.firstName}
                onChange={(e) =>
                  dispatch({ type: "FIRST_NAME", payload: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-primary-content" htmlFor="last-name">
                Last Name
              </label>
              <input
                id="last-name"
                className="input bg-base-200 input-bordered text-primary-content"
                type="text"
                value={state.lastName}
                onChange={(e) => {
                  dispatch({ type: "LAST_NAME", payload: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="divider" />
          <div className="lg:max-w-[70%] flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-primary-content" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input bg-base-200 input-bordered text-primary-content"
                type="text"
                value={state.email}
                onChange={(e) => {
                  dispatch({ type: "EMAIL", payload: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-primary-content" htmlFor="phone-number">
                Phone Number
              </label>
              <input
                id="phone-number"
                className="input bg-base-200 input-bordered text-primary-content"
                type="text"
                value={state.phoneNumber}
                onChange={(e) => {
                  dispatch({ type: "PHONE_NUMBER", payload: e.target.value });
                }}
              />
            </div>
          </div>
        </form>
        <button
          onClick={handleLogout}
          type="button"
          className="btn btn-secondary self-center"
        >
          log out
        </button>
      </div>
    </>
  );
}
