import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "../../actions/authAction";
import "../../styles/Register.css";
import Logo from "../../assets/images/logo.png";

const Register = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputFullname, setInputFullname] = useState("");
  const [inputBirthday, setInputBirthday] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // Get errors from Redux store
  const usernameError = useSelector((state) => state.errors.username);
  const emailError = useSelector((state) => state.errors.email);
  const passwordError = useSelector((state) => state.errors.password);
  const fullNameError = useSelector((state) => state.errors.fullName);
  const birthDateError = useSelector((state) => state.errors.birthDate);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.errors);

  useEffect(() => {
    if (authError && Object.keys(authError).length > 0) {
      setShow(true);
    }
  }, [authError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setShow(false);

    const userData = {
      username: inputUsername,
      password: inputPassword,
      fullName: inputFullname,
      birthDate: inputBirthday,
      email: inputEmail,
    };

    try {
      await dispatch(registerUser(userData, navigate));
      // If successful, it will redirect to login page
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="facebook-register">
      <div className="facebook-register__container">
        <div className="facebook-register__left">
          <img src={Logo} alt="Facebook" className="facebook-register__logo" />
          <h2 className="facebook-register__tagline">Create a new account</h2>
          <p>It's quick and easy.</p>
        </div>
        <div className="facebook-register__right">
          <Form className="facebook-register__form" onSubmit={handleSubmit}>
            {show && authError.message && (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                {authError.message}
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={inputFullname}
                onChange={(e) => setInputFullname(e.target.value)}
                isInvalid={!!fullNameError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {fullNameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email address"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                isInvalid={!!emailError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control
                type="text"
                placeholder="Username"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                isInvalid={!!usernameError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {usernameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="New password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                isInvalid={!!passwordError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="birthday">
              <Form.Control
                type="date"
                placeholder="Birthday"
                value={inputBirthday}
                onChange={(e) => setInputBirthday(e.target.value)}
                isInvalid={!!birthDateError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {birthDateError}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              className="facebook-register__submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
            <div className="facebook-register__login">
              <Button variant="link" onClick={() => navigate("/login")}>
                Already have an account?
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
