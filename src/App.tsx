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
import { MainFooter } from "./components/MainFooter";
import MainApp from "./components/routes/mainapp/MainApp";
import { dataArr } from "./components/routes/mainapp/MainApp";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <AppShell
        navbar={<MainNav />}
        header={
          <Header height={rem(84)} p="xs">
            {<MainHeader mainLinks={mainlinks} userLinks={userLinks} />}{" "}
          </Header>
        }
        footer={<MainFooter/>}
      >
        <Box h='600px'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mainapp" element={<MainApp data={dataArr}/>} />
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          {!isLoggedIn && <Route path="/register" element={<Register />} />}
          <Route path="/login" element={<Login />} />
        </Routes>
        </Box>
      </AppShell>{" "}
      *
    </>
  );
}

export default App;
