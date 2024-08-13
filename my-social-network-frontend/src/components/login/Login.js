import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { loginUser } from "../../actions/authAction";
import "../../styles/Login/FacebookLogin.css";
import Logo from "../../assets/images/logo.png";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.errors);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (errors && errors.message) {
      console.log("Error received:", errors.message);
      setMessage(errors.message);
      setMessageType("error");
      setShowToast(true);
    }
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [errors, isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setShowToast(false);

    const userData = {
      username: inputUsername,
      password: inputPassword,
    };

    try {
      await dispatch(loginUser(userData, navigate));
      // If login is successful, getUserInfo will be called and user will be redirected
    } catch (error) {
      console.error("Login failed:", error);
      setShowToast(true);
      // Error handling is managed by the useEffect hook watching the errors state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="facebook-login">
      <div className="facebook-login__container">
        <div className="facebook-login__left">
          <img src={Logo} alt="Facebook" className="facebook-login__logo" />
          <h2 className="facebook-login__tagline">
            Mạng xã hội giúp bạn kết nối và chia sẻ với mọi người trong cuộc
            sống của bạn.
          </h2>
        </div>
        <div className="facebook-login__right">
          <Form className="facebook-login__form" onSubmit={handleSubmit}>
            {showToast && (
              <div className={`toast-notification ${messageType}`}>
                {message}
              </div>
            )}
            <Form.Control
              type="text"
              placeholder="Username"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
            <Form.Control
              type="password"
              placeholder="Password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
            <Button
              className="facebook-login__submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
            <div className="facebook-login__forgot">
              <Button
                variant="link"
                onClick={() => navigate("/reset-password")}
              >
                Quên mật khẩu?
              </Button>
            </div>
            <div className="facebook-login__divider"></div>
            <Button
              className="facebook-login__create-account"
              variant="success"
              onClick={() => navigate("/register")}
            >
              Tạo tài khoản mới
            </Button>
          </Form>
          <p className="facebook-login__create-page">
            <strong>Tạo Trang</strong> dành cho người nổi tiếng, thương hiệu
            hoặc doanng nghiệp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
