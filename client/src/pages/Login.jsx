/* DEPENDENCIES */
import { SIGNUP, LOGIN } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import "../styles/login.css";

import Auth from "../utils/auth";

/* LOGIN */
export default function Login() {
  const [nameAlert, setNameAlert] = useState(false);
  const [usernameAlert, setUsernameAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [signUp] = useMutation(SIGNUP);
  const [login] = useMutation(LOGIN);

  const clearForm = () => {
    setFormErrorMessage("");
    setLoginFormData({ username: "", password: "" });
    setSignupFormData({ name: "", username: "", password: "" });
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
        {isLogin ? (
          <div id="login-card">
            <h2 className="title">Welcome back!</h2>
            {formErrorMessage && <div id="form-error">{formErrorMessage}</div>}
            <label htmlFor="username" className="login-label">
              <span className="med-text">Username</span>
              <input
                className="login-input"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={loginFormData.username}
                onChange={(e) =>
                  setLoginFormData({
                    ...loginFormData,
                    username: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="password" className="login-label">
              <span className="med-text">Password</span>
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="on"
                value={loginFormData.password}
                onChange={(e) =>
                  setLoginFormData({
                    ...loginFormData,
                    password: e.target.value,
                  })
                }
              />
            </label>
            <div id="submit-div">
              <button type="submit" id="submit">
                Login
              </button>
            </div>
            <p className="med-text" id="choose-signup">
              Don't have an account?
              <span onClick={() => setIsLogin(false)}> Sign up</span>
            </p>
          </div>
        ) : (
          <div id="login-card">
            <h2 className="title">Welcome</h2>
            <label htmlFor="name" className="login-label">
              <div>
                <span className="med-text">First name</span>
                <input
                  className="login-input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={signupFormData.name}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </label>
            <label htmlFor="username" className="login-label">
              <span className="med-text">Username</span>
              <input
                className="login-input"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={signupFormData.username}
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    username: e.target.value,
                  })
                }
              />
            </label>
            {usernameAlert && (
              <p className="small-text">
                Your username should be at least 6 characters long and must use
                only lowercase alphanumeric characters.
              </p>
            )}
            <label htmlFor="password" className="login-label">
              <span className="med-text">Password</span>
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="on"
                value={signupFormData.password}
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    password: e.target.value,
                  })
                }
              />
              {passwordAlert && (
                <p className="small-text">
                  Your password must be at least 6 characters long.
                </p>
              )}
            </label>
            <div id="submit-div">
              <button type="submit" id="submit">
                Signup
              </button>
            </div>
            <p className="med-text" id="choose-signup">
              Don't have an account?
              <span onClick={() => setIsLogin(false)}> Sign up</span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
