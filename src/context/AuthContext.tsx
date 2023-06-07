import { createContext, useEffect, useState } from "react";
import { AuthContextType, ChildProps } from "../types";

const initialState: AuthContextType = {
  isLoggedIn: false,
  login(username, email, token) {},
  logout() {},
};

const AuthContext = createContext<AuthContextType>(initialState);

const AuthContextProvider = ({ children }: ChildProps) => {
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user") ?? "";
    if (userFromStorage === "") {
      console.log("helooooo");
    } else {
      const user = JSON.parse(userFromStorage);

      // TODO check if it's not empty
      const token = user.token;
      const email = user.email;
      const username = user.username;

      login(username, email, token);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const login = (userName: string, email: string, token: string) => {
    setIsLoggedIn(true);
    setEmail(email);
    setUserName(userName);
    setToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(undefined);
    setEmail(undefined);
    setUserName(undefined);
  };
  const contextValues = { isLoggedIn, userName, token, email, login, logout };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

export default AuthContext;
