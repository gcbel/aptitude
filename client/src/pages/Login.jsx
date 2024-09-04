/* DEPENDENCIES */
import { SIGN_UP, LOGIN } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import "../styles/login.css";

import Auth from "../utils/auth";

/* LOGIN */
export default function Login() {
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [usernameAlert, setUsernameAlert] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });

  const [signUp] = useMutation(SIGN_UP);
  const [login] = useMutation(LOGIN);

  const clearForm = () => {
    setFormErrorMessage("");
    setFormData({ username: "", password: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrorMessage("");

    if (!/^[a-zA-Z0-9_]*$/.test(formData.username)) {
      setFormErrorMessage("Username must be alphanumeric");
      return;
    }

    try {
      const variables = {
        username: formData.username.trim().toLowerCase(),
        password: formData.password,
      };

      if (isLogin) {
        const { data } = await login({ variables });
        Auth.login(data.login.token);
      } else {
        if (formData.password.length < 6) {
          setFormErrorMessage("Password must be at least 6 characters long");
          return;
        }

        const { data } = await signUp({ variables });
        Auth.login(data.signUp.token);
      }
    } catch (e) {
      setFormErrorMessage(e.message || "An error occurred");
    }
  };

  if (signUp.loading || login.loading) {
    return <div className="loading"></div>;
  }

  return (
    <div className="montserrat" id="login-page">
      <form onSubmit={handleSubmit} id="login-form">
        <div className="card">
          <h2 className="playfair title">
            {isLogin ? "Welcome back!" : "Welcome!"}
          </h2>
          <h3 className="large-text">{isLogin ? "Login" : "Sign Up"}</h3>
          {formErrorMessage && <div id="form-error">{formErrorMessage}</div>}
          <label htmlFor="username" className="login-label">
            <span className="med-text">Username</span>
            <input
              className="login-input"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {usernameAlert && (
              <p className="small-text">
                Your username should be at least 6 characters long and must use
                only lowercase alphanumeric characters.
              </p>
            )}
          </label>
          <label htmlFor="password" className="login-label" id="password-label">
            <span className="med-text">Password</span>
            <input
              className="login-input"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="on"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {passwordAlert && (
              <p className="small-text">
                Your password must be at least 6 characters long.
              </p>
            )}
          </label>
          <div id="submit-div">
            <button type="submit" className="bg-slate-900" id="submit">
              {isLogin ? "Login" : "Sign up"}
            </button>
          </div>
          {isLogin ? (
            <p className="med-text" id="">
              Don't have an account?
              <span onClick={() => setIsLogin(false)}> Sign up</span>
            </p>
          ) : (
            <p className="med-text">
              Already have an account?
              <span onClick={() => setIsLogin(true)}> Login</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
