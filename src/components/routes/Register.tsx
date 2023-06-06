import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterFormType } from "../../types";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import authService from "../../services/auth.service";

const Register = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | undefined>(undefined);
  const { isLoggedIn } = useContext(AuthContext);

  const initialValues: RegisterFormType = {
    username: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Name is too short").required(),
    email: Yup.string().email("must be a valid email").required(),
    password: Yup.string().min(3, "Password is too short").required(),
  });

  const handleRegister = (formValues: RegisterFormType) => {
    setIsLoading(true);
    const { username, email, password } = formValues;

    authService
      .register(username, email, password)
      .then((res) => {
        console.log(res);
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
    <div>
      {err && <div>{err} </div>}
      {isLoading && <ColorRing />}
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="w-50 mx-auto">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <Field
              name="username"
              type="text"
              className="form-control"
              id="username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="alert alert-danger"
            />
          </div>
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
          <div className="col-12">
            <button
              disabled={isLoading}
              className="btn btn-primary"
              type="submit"
            >
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
