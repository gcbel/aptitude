/* DEPENDENCIES */
import { SIGNUP, LOGIN } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import "../styles/login.css";

import Auth from "../utils/auth";

/* LOGIN */
export default function Login() {
  const [nameAlert, setNameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
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
    email: "",
    username: "",
    password: "",
  });

  const [signUp] = useMutation(SIGNUP);
  const [login] = useMutation(LOGIN);

  const clearForm = () => {
    setFormErrorMessage("");
    setLoginFormData({ username: "", password: "" });
    setSignupFormData({ name: "", email: "", username: "", password: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrorMessage("");

    if (isLogin) {
      try {
        const variables = {
          username: loginFormData.username.trim().toLowerCase(),
          password: loginFormData.password,
        };

        const { data } = await login({ variables });
        Auth.login(data.login.token);
      } catch (e) {
        setFormErrorMessage(e.message || "An error occurred");
      }
    } else {
      try {
        const variables = {
          name: signupFormData.name,
          email: signupFormData.email,
          username: signupFormData.username.trim().toLowerCase(),
          password: signupFormData.password,
        };

        let formApproved = true;

        if (signupFormData.name.length < 2) {
          setNameAlert(true);
          formApproved = false;
        } else {
          setNameAlert(false);
        }

        if (
          !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(
            signupFormData.email
          )
        ) {
          setEmailAlert(true);
          formApproved = false;
        } else {
          setEmailAlert(false);
        }

        if (!/^[a-zA-Z0-9_]*$/.test(signupFormData.username)) {
          setUsernameAlert(true);
          formApproved = false;
        } else {
          setUsernameAlert(false);
        }

        if (signupFormData.password.length < 6) {
          setPasswordAlert(true);
          formApproved = false;
        } else {
          setPasswordAlert(false);
        }

        if (formApproved) {
          const { data } = await signUp({ variables });
          Auth.login(data.signUp.token);
        } else {
          return;
        }
      } catch (e) {
        setFormErrorMessage(e.message || "An error occurred");
      }
    }
  };

  if (signUp.loading || login.loading) {
    return <div className="loading"></div>;
  }

  return (
    <div className="montserrat" id="login-page">
      <form onSubmit={handleSubmit} id="login-form">
        {isLogin ? (
          // LOGIN
          <div id="login-card">
            <h2 className="title">Welcome back!</h2>
            {formErrorMessage && <div id="form-error">{formErrorMessage}</div>}
            <label htmlFor="username" className="login-label">
              <span className="med-text">Username</span>
              <input
                className="login-input input"
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
                className="login-input input"
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
          // SIGN UP
          <div id="login-card">
            <h2 className="title">Welcome!</h2>
            {formErrorMessage && <div id="form-error">{formErrorMessage}</div>}
            <label htmlFor="name" className="login-label">
              <div>
                <div className="name-and-alert">
                  <span className="med-text">First name</span>
                  {nameAlert && (
                    <p className="small-text alert">
                      Please enter a longer name.
                    </p>
                  )}
                </div>
                <input
                  className="login-inputn input"
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
            <label htmlFor="email" className="login-label">
              <div className="name-and-alert">
                <span className="med-text">Email</span>
                {emailAlert && (
                  <p className="small-text alert">Please enter your email.</p>
                )}
              </div>
              <input
                className="login-input input"
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={signupFormData.email}
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    email: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="username" className="login-label">
              <div className="name-and-alert">
                <span className="med-text">Username</span>
                {usernameAlert && (
                  <p className="small-text alert">
                    Your username should be at least 6 characters long and must
                    use only lowercase alphanumeric characters.
                  </p>
                )}
              </div>
              <input
                className="login-input input"
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
            <label htmlFor="password" className="login-label">
              <div className="name-and-alert">
                <span className="med-text">Password</span>
                {passwordAlert && (
                  <p className="small-text alert">
                    Your password must be at least 6 characters long.
                  </p>
                )}
              </div>
              <input
                className="login-input input"
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
            </label>
            <div id="submit-div">
              <button type="submit" id="submit">
                Signup
              </button>
            </div>
            <p className="med-text" id="choose-signup">
              Already have an account?
              <span onClick={() => setIsLogin(true)}> Login</span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
