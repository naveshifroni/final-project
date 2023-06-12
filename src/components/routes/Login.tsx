import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginFormType } from "../../types";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import authService from "../../services/auth.service";
import { Box } from "@mantine/core";

const Login = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | undefined>(undefined);
  const { isLoggedIn, login } = useContext(AuthContext);

  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("must be a valid email").required(),
    password: Yup.string().min(3, "Password is too short").required(),
  });

  const handleLogin = (formValues: LoginFormType) => {
    setIsLoading(true);
    const { email, password } = formValues;

    authService
      .login(email, password)
      .then((res) => {
        console.log(res);
        const token = res.accessToken;
        const email = res.email;
        const username = res.username;

        login(username, email, token);
        //update context

        //login()
        nav("/");
      })
      .catch((e) => {
        console.log(e);
        setErr(JSON.stringify(e.response.data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <Box ta="center" h="100vh" pt="5vw" sx={{ backgroundColor: "#f3f3f3" }}>
      <Box mb="50px"> GoToApp </Box>
      <div>
        {err && <div>{err} </div>}
        {isLoading && <ColorRing />}
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="w-50 mx-auto">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="form-control"
                id="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="w-50 mx-auto">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="form-control"
                id="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="col-12 justify-content-center d-flex text-center mt-4">
              <button
                disabled={isLoading}
                className="btn btn-primary"
                type="submit"
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Box>
  );
};

export default Login;
