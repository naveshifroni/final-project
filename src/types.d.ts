export type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export type ChildProps = {
  children?: React.ReactNode;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  admin: boolean;
  username?: string;
  email?: string;
  token?: string;
  login: (
    userName: string,
    email: string,
    token: string,
    isAdmin: boolean
  ) => void;
  logout: () => void;
};

export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type appSettingsType = {
  title: string;
  notifications: boolean;
  inbox: boolean;
  publish: boolean;
  following: boolean;
  followers: boolean;
};
