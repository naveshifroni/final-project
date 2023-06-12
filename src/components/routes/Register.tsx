import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterFormType } from "../../types";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import authService, { login } from "../../services/auth.service";
import { Box, Text, Flex, Grid, Select } from "@mantine/core";
import Swal from "sweetalert2";

const Register = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | undefined>(undefined);
  const { isLoggedIn, login } = useContext(AuthContext);
  const [role, setRole] = useState<string | null>(null);
  console.log(role);
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
    const { username, email, password } = formValues;
    if (role === null) {
      Swal.fire("Please pick a role");
    } else {
      setIsLoading(true);
      authService
        .register(username, email, password, role ?? "")
        .then((res) => {
          console.log(res);
          const token = res.accessToken;
          const email = res.email;
          const username = res.username;
          const roleOfUser = res.roleId ?? "";
          if (roleOfUser === "6475ae11f3de28d36990efcd") {
            login(username, email, token, true);
          } else {
            login(username, email, token, false);
          }

          nav("/");
        })
        .catch((e) => {
          console.log(e);
          setErr(JSON.stringify(e));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <Box ta="center" h="100vh" pt="5vw" sx={{ backgroundColor: "#f3f3f3" }}>
      <Box mb="30px"> GoToApp </Box>
      <div>
        {err && (
          <Text color="red" mb="lg">
            {" "}
            Some of the details are not valid{" "}
          </Text>
        )}
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
            <Grid justify="center" mt="20px">
              <Grid.Col span={4}>
                <Select
                  label="Your favorite framework/library"
                  placeholder="Pick one"
                  data={[
                    { value: "user", label: "User" },
                    { value: "moderator", label: "Moderator" },
                    { value: "admin", label: "Admin" },
                  ]}
                  value={role}
                  onChange={setRole}
                />
              </Grid.Col>
              <Grid.Col span={12} sx={{ textAlign: "center" }}>
                <button
                  disabled={isLoading}
                  className="btn btn-primary w-25 text-center"
                  type="submit"
                >
                  Register
                </button>
              </Grid.Col>
              <Grid.Col span={12} sx={{ textAlign: "center" }}>
                <Box>
                  {" "}
                  already a member? <a href="/login">log in</a>
                </Box>
              </Grid.Col>
            </Grid>
          </Form>
        </Formik>
      </div>
    </Box>
  );
};

export default Register;
