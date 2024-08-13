import React, { useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { jwtDecode as jwt_decode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/Home";
import Timeline from "./components/Timeline";
import Profile from "./components/profile/Profile";
import ResetPassword from "./components/login/ResetPassword";

// Custom hook to check authentication
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check for token in localStorage
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      dispatch(setCurrentUser(decoded));

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        dispatch(logoutUser());
        // Redirect to login
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return isAuthenticated;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuth = useAuth();
  return isAuth ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

// Public Route component (for login and register)
const PublicRoute = ({ children }) => {
  const isAuth = useAuth();
  return !isAuth ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/home" replace />
  );
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<Timeline />} />
        <Route path="home" element={<Timeline />} />
        <Route path="/profile/:username" element={<Profile />} />
        {/* Add other routes here */}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />{" "}
      {/* Changed this line */}
    </Routes>
  );
};

export default App;
