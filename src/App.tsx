import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import About from "./components/routes/About";
import Login from "./components/routes/Login";
import Register from "./components/routes/Register";
import Home from "./components/routes/Home";
import "./App.css";
import DarkModeContext from "./context/dark-mode-context";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
      </Routes>
    </>
  );
}

export default App;
