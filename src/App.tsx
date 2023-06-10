import React, { useContext } from "react";
import { About } from "./components/routes/About";
import Login from "./components/routes/Login";
import Register from "./components/routes/Register";
import Home from "./components/routes/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { MainHeader, userLinks, mainlinks } from "./components/MainHeader";
import { MainFooter, data } from "./components/MainFooter";
import MainApp3 from "./components/routes/mainapp/MainApp3";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && <MainHeader mainLinks={mainlinks} userLinks={userLinks} />}
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mainapp" element={<MainApp3 />} />{" "}
          </>
        )}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
      </Routes>
      {isLoggedIn && <MainFooter data={data} />}
    </>
  );
}

export default App;
