import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../app/Features/auth/authSlice";
import {
  StyledError,
  FormContainer,
  InputGroup,
} from "./Components/FormComponents";
import { FlexCenter, Button } from "../../Components";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email Format").required("Required!"),
  password: Yup.string()
    .min(4, "Must be at least 4 characters")
    .max(30, "Must be maximum 30 characters")
    .required("Required!"),
});

export const Login = () => {
  const loginDispatch = useDispatch();
  const { loggedInStatus, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogin = (values) => {
    const { email, password } = values;
    loginDispatch(login({ email, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={validationSchema}
    >
      <FlexCenter>
        <Form>
          <FormContainer>
            <InputGroup>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" autoComplete="off" />
              <ErrorMessage name="email" component={StyledError} />
            </InputGroup>
            <InputGroup>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                autoComplete="off"
              />
              <ErrorMessage name="password" component={StyledError} />
            </InputGroup>
            <InputGroup>
              <Button
                type="submit"
                variant="primary"
                size="large"
                state={loggedInStatus}
              >
                Login
              </Button>
              <p>
                Don't have Account? <Link to="/signup">Register</Link>
              </p>
            </InputGroup>
          </FormContainer>
        </Form>
      </FlexCenter>
    </Formik>
  );
};
