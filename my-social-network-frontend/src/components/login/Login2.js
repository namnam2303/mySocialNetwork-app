import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { loginUser } from "../../actions/authAction";
import "../../styles/FacebookLogin.css"; // New CSS file

import Logo from "../../assets/images/logo.png";

const Login2 = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.errors);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      username: inputUsername,
      password: inputPassword,
    };

    dispatch(loginUser(userData, navigate)).then(() => {
      setLoading(false);
      if (authError.message) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  };

  const handlePassword = () => {
    // Xử lý khi quên mật khẩu
  };

  return (
    <div className="facebook-login">
      <div className="facebook-login__container">
        <div className="facebook-login__left">
          <img src={Logo} alt="Facebook" className="facebook-login__logo" />
          <h2 className="facebook-login__tagline">
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </h2>
        </div>
        <div className="facebook-login__right">
          <Form className="facebook-login__form" onSubmit={handleSubmit}>
            {show && authError.message && (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                {authError.message}
              </Alert>
            )}
            <Form.Control
              type="text"
              placeholder="Email hoặc số điện thoại"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
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
              <Button variant="link" onClick={handlePassword}>
                Quên mật khẩu?
              </Button>
            </div>
            <div className="facebook-login__divider"></div>
            <Button
              className="facebook-login__create-account"
              variant="success"
            >
              Tạo tài khoản mới
            </Button>
          </Form>
          <p className="facebook-login__create-page">
            <strong>Tạo Trang</strong> dành cho người nổi tiếng, thương hiệu
            hoặc doanh nghiệp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login2;
