import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./components/Home";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Header from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import initAuth from "./utils/initAuth";

const App = () => {
  useEffect(() => {
    initAuth();
  }, []);
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
