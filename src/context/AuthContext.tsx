import { createContext, useEffect, useState } from "react";
import { AuthContextType, ChildProps } from "../types";
import { useNavigate } from "react-router-dom";
import { getChosenApps } from "../services/auth.service";

const initialState: AuthContextType = {
  isLoggedIn: false,
  login(username, email, token) {},
  logout() {},
};

const AuthContext = createContext<AuthContextType>(initialState);

const AuthContextProvider = ({ children }: ChildProps) => {
  const nav = useNavigate();
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user") ?? "";
    if (userFromStorage === "") {
      logout();
    } else {
      const user = JSON.parse(userFromStorage);

      // TODO check if it's not empty
      const token = user.token;
      const email = user.email;
      const username = user.username;
      /*      getChosenApps().then((res) => {
        const arr = res.data.arr ?? [];
        console.log(arr);
        setShop(arr);
        console.log(shop);
      }); */

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

  const contextValues = {
    isLoggedIn,
    userName,
    token,
    email,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

export default AuthContext;
