import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { FaGithub } from "react-icons/fa";
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
    <FlexCenter>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
        >
          <Form>
            <h3 className="text-xl font-medium text-primary-700">
              Login in to our account
            </h3>
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
                size="full"
                state={loggedInStatus}
              >
                Login
              </Button>
            </InputGroup>
          </Form>
        </Formik>
        <InputGroup>
        <p className="text-center text-sm font-medium mb-2">Or</p>
          <Button variant="github" size="full">
            <FaGithub /> Login with Github
          </Button>
          <p className="my-2">
            Don't have Account? <Link to="/signup">Register</Link>
          </p>
        </InputGroup>
      </FormContainer>
    </FlexCenter>
  );
};
