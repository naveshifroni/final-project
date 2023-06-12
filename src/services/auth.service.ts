import axios from "axios";
import { appSettingsType } from "../types";

const baseUrl = "http://localhost:3001/api";
const baseUrlAuth = "http://localhost:3001/api/auth";

const register = (
  username: string,
  email: string,
  password: string,
  role: string
) => {
  return axios
    .post(baseUrlAuth + "/signup", { username, email, password, role })
    .then((res) => {
      const token = res.data.accessToken;
      const email = res.data.email;
      const username = res.data.username;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ email, username, token })
        );
      }
      return res.data;
    });
};

const login = (email: string, password: string) => {
  return axios
    .post(baseUrlAuth + "/signin", { email, password })
    .then((res) => {
      const token = res.data.accessToken;
      const email = res.data.email;
      const username = res.data.username;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ email, username, token })
        );
      }
      return res.data;
    });
};

const updateAppSettings = (app: appSettingsType) => {
  return axios.post(baseUrl + "/app", { app }).then((res) => {
    return res;
  });
};

const addApps = (apps: any) => {
  return axios.post(baseUrl + "/add", { apps }).then((res) => {
    return res;
  });
};

const getChosenApps = () => {
  return axios.get(baseUrl + "/add").then((res) => {
    return res;
  });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export { register, login, logout, updateAppSettings, addApps, getChosenApps };

const authService = { register, login, logout };
export default authService;
