/* DEPENDENCIES */
import { SIGN_UP, LOGIN } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import "../styles/login.css";

import Auth from "../utils/auth";

/* LOGIN */
export default function Login() {
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
    <div id="login-page">
      <form onSubmit={handleSubmit} id="login-form">
        <div id="login-form-inner">
          <h2 id="form-greeting">{isLogin ? "Welcome back!" : "Welcome!"}</h2>
          <h3 id="form-title">{isLogin ? "Login" : "Sign Up"}</h3>
          {formErrorMessage && <div id="form-error">{formErrorMessage}</div>}
          <label htmlFor="username" className="login-label">
            <span className="login-title">Username</span>
            <input
              className="login-input"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              minLength={6}
              maxLength={16}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <p>
              Your username should be at least 6 characters long and must use
              only lowercase alphanumeric characters.
            </p>
          </label>
          <label htmlFor="password" className="login-label" id="password-label">
            <span className="login-title">Password</span>
            <input
              className="login-input"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="on"
              minLength={6}
              maxLength={128}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <p>Your password must be at least 6 characters long.</p>
          </label>
          <div className="flex flex-col w-full gap-4 mt-2">
            <div id="login-or-signup-div">
              <button type="submit" id="login-or-signup">
                {isLogin ? "Login" : "Sign up"}
              </button>
            </div>
          </div>
          {isLogin ? (
            <p>
              Don't have an account?
              <span onClick={() => setIsLogin(false)}> Sign up</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setIsLogin(true)}> Login</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
