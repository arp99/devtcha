import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import "./App.css";
import { useDispatch } from "react-redux";
import { logout } from "./app/Features/auth/authSlice";
import { Route, Routes } from "react-router";
import { PrivateRoute } from "./PrivateRoute/privateRoute";
import { Home, Login, Signup, User } from "./Pages";
require("dotenv").config();

function App() {
  return (
    <div className="App">
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
