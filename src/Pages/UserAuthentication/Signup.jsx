import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { signup } from "../../app/Features/auth/authSlice";
import { FlexCenter, Button } from "../../Components";
import {
  FormContainer,
  InputGroup,
  StyledError,
} from "./Components/FormComponents";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  userName: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid Email Format").required("Required!"),
  password: Yup.string()
    .min(4, "Must be at least 4 characters")
    .max(30, "Must be maximum 30 characters")
    .required("Required!"),
});

export const Signup = () => {
  const signupDispatch = useDispatch();
  const { signupStatus } = useSelector((state) => state.auth);

  const handleSignup = (values) => {
    const { firstName, lastName, email, password, userName } = values;
    signupDispatch(signup({ firstName, lastName, email, password, userName }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSignup}
      validationSchema={validationSchema}
    >
      <FlexCenter>
        <Form>
          <FormContainer>
            <InputGroup>
              <label htmlFor="firstName">First Name</label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="off"
              />
              <ErrorMessage component={StyledError} name="firstName" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="lastName">Last Name</label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="off"
              />
              <ErrorMessage component={StyledError} name="lastName" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="userName">User Name</label>
              <Field
                type="text"
                id="userName"
                name="userName"
                autoComplete="off"
              />
              <ErrorMessage component={StyledError} name="userName" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" autoComplete="off" />
              <ErrorMessage component={StyledError} name="email" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="password">Password</label>
              <Field
                type="text"
                id="password"
                name="password"
                autoComplete="off"
              />
              <ErrorMessage component={StyledError} name="password" />
            </InputGroup>
            <InputGroup>
              <Button
                type="submit"
                variant="primary"
                size="full"
                state={signupStatus}
              >
                Signup
              </Button>
              <p>
                Already Registered? <Link to="/login">Login</Link>
              </p>
            </InputGroup>
          </FormContainer>
        </Form>
      </FlexCenter>
    </Formik>
  );
};
