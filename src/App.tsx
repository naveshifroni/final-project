import React, { useContext } from "react";
import {About} from "./components/routes/About";
import Login from "./components/routes/Login";
import Register from "./components/routes/Register";
import Home from "./components/routes/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { AppShell, Box, Header, rem } from "@mantine/core";
import { MainNav } from "./components/MainNav";
import { MainHeader, userLinks, mainlinks }from "./components/MainHeader";
import { MainFooter, data } from "./components/MainFooter";
import MainApp3 from "./components/routes/mainapp/MainApp3";


function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <MainHeader mainLinks={mainlinks} userLinks={userLinks} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mainapp" element={<MainApp3 />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
        <Route path="/login" element={<Login />} />
      </Routes>
      <MainFooter data={data}/>
    </>
  );
}

export default App;
