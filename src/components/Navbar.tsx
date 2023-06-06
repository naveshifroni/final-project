import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <nav>
      <NavLink to="/about">about</NavLink>
      <NavLink to="/">home</NavLink>
      {!isLoggedIn && <NavLink to="/register">register</NavLink>}
      {!isLoggedIn && <NavLink to="/login">login</NavLink>}
    </nav>
  );
};

export default Navbar;
