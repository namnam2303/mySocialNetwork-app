import React from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/Home";
import Timeline from "./components/Timeline";
import Profile from "./components/profile/Profile";
import ResetPassword from "./components/login/ResetPassword";

// Custom hook to check and manage authentication
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  React.useEffect(() => {
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

  return isAuthenticated;
};

// Higher-order component for route protection
const withRouteProtection = (Component, isProtected) => {
  return function ProtectedComponent({ children }) {
    const isAuth = useAuth();
    const shouldRender = isProtected ? isAuth : !isAuth;
    const redirectPath = isProtected ? "/login" : "/home";

    if (shouldRender) {
      return children ? children : <Component />;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  };
};

const ProtectedRoute = withRouteProtection(Outlet, true);
const PublicRoute = withRouteProtection(Outlet, false);

const App = () => (
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
      <Route path="profile/:username" element={<Profile />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
