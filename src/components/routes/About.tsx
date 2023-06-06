import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const About = () => {
  const { username } = useContext(AuthContext) ?? "guest";
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }
  fetch("http://localhost:3001/api/books/all", {
    headers: { token: token },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

  return <div>hello {username}</div>;
};

export default About;
