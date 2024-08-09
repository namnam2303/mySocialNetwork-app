import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "../../actions/authAction";
import "../../styles/Register.css";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";

const Register = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputFullname, setInputFullname] = useState("");
  const [inputBirthday, setInputBirthday] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  // Get errors from Redux store
  const usernameError = useSelector((state) => state.errors.username);
  const emailError = useSelector((state) => state.errors.email);
  const passwordError = useSelector((state) => state.errors.password);
  const fullNameError = useSelector((state) => state.errors.fullName);
  const birthDateError = useSelector((state) => state.errors.birthDate);

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
      fullName: inputFullname,
      birthDate: inputBirthday,
      email: inputEmail,
    };

    dispatch(registerUser(userData, navigate)).then(() => {
      setLoading(false);
      if (authError.message) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Register</div>
        {/* Alert */}
        {show && authError.message ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {authError.message}
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="fullname">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={inputFullname}
            onChange={(e) => setInputFullname(e.target.value)}
            required
            isInvalid={!!fullNameError}
          />
          <Form.Control.Feedback type="invalid">
            {fullNameError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="birthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={inputBirthday}
            onChange={(e) => setInputBirthday(e.target.value)}
            required
            isInvalid={!!birthDateError}
          />
          <Form.Control.Feedback type="invalid">
            {birthDateError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            required
            isInvalid={!!emailError}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            required
            isInvalid={!!usernameError}
          />
          <Form.Control.Feedback type="invalid">
            {usernameError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            required
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Register
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Registering...
          </Button>
        )}
      </Form>
      {/* Footer */}
    </div>
  );
};

export default Register;
