interface SettingsAction {
  type: string;
  payload: string;
}

interface SettingsState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type { SettingsAction, SettingsState };
