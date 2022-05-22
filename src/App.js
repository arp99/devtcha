import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import "./App.css";
import { useDispatch } from "react-redux";
import { logout } from "./app/Features/auth/authSlice";
import { resetUserState } from "./app/Features/User/userSlice";
import { Route, Routes } from "react-router";
import { PrivateRoute } from "./PrivateRoute/privateRoute";
import { Home, Login, Signup, User } from "./Pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  //logout user when token is expired
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && jwtDecode(token).exp * 1000 < Date.now()) {
      dispatch(logout());
      dispatch(resetUserState());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer limit={1} autoClose={1500} />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
