import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./app/Features/auth/authSlice";
import { resetUserState } from "./app/Features/User/userSlice";
import { Route, Routes } from "react-router";
import { PrivateRoute } from "./PrivateRoute/privateRoute";
import { Home, Login, Signup, User } from "./Pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserData } from "./app/Features/User/AsyncThunks";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && status === "idle") {
      dispatch(getUserData());
    }
  }, [dispatch, status, token]);

  //logout user when token is expired
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && jwtDecode(token).exp * 1000 < Date.now()) {
      dispatch(logout());
      dispatch(resetUserState());
    }
  }, [dispatch]);

  return (
    <div className="App dark:bg-[#0f172a]">
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
