import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset, resetPassword } from "../../actions/authAction";
import "../../styles/Login/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleRequestReset = (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    dispatch(requestPasswordReset(email))
      .then((responseData) => {
        setStep(2);
        setMessage(responseData);
        setMessageType("success");
        setShowToast(true);
      })
      .catch((errorData) => {
        setMessage(errorData);
        setMessageType("error");
        setShowToast(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      setShowToast(true);
      return;
    }
    setIsLoading(true);
    dispatch(resetPassword(token, newPassword))
      .then((responseData) => {
        setMessage(responseData);
        if (responseData === "Password has been reset successfully") {
          setMessageType("success");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setMessageType("error");
        }
        setShowToast(true);
      })
      .catch((errorData) => {
        setMessage(errorData);
        setMessageType("error");
        setShowToast(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Reset Your Password</h2>
        {showToast && (
          <div className={`toast-notification ${messageType}`}>{message}</div>
        )}
        {step === 1 ? (
          <form onSubmit={handleRequestReset}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`submit-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Request Password Reset"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label htmlFor="token">Reset Token</label>
              <input
                type="text"
                id="token"
                placeholder="Enter token from email"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`submit-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
