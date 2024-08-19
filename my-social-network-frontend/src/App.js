import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/home/Home";
import Timeline from "./components/home/Timeline";
import Profile from "./components/profile/Profile";
import ResetPassword from "./components/login/ResetPassword";
import NotFound from "../src/components/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));

      if (Date.now() / 1000 > decoded.exp) {
        dispatch(logoutUser());
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/home" replace />;
    }
    return children;
  };

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
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Timeline />} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="friends" element={<div>Friends Page</div>} />
        <Route path="notifications" element={<div>Notifications Page</div>} />
        <Route path="messages" element={<div>Messages Page</div>} />
      </Route>
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default App;
