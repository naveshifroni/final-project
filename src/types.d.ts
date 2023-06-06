export type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export type ChildProps = {
  children?: React.ReactNode;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  username?: string;
  email?: string;
  token?: string;
  login: (userName: string, email: string, token: string) => void;
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
