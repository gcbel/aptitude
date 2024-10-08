/* DEPENDENCIES */
import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="1"
    stroke="black"
    strokeLinecap="square"
    {...props}
  />
);

/* HAMBURGER NAV */
export default function HamNav({ toggle }) {
  const isLoggedIn = Auth.isLoggedIn();
  const [showNav, setNav] = useState(false);

  // Sets nav to normal after click
  const navClick = () => {
    setNav((prev) => !prev);
    toggle();
  };

  return (
    <div>
      {/* ICON */}
      <button onClick={() => navClick()}>
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </button>

      {/* DROPDOWN */}
      {showNav && (
        <div className="large-text" id="ham-dropdown">
          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={() => navClick()}>
                Profile
              </Link>
              <Link to="/settings" onClick={() => navClick()}>
                Settings
              </Link>
              <p
                onClick={() => {
                  Auth.logout();
                  navClick();
                }}
              >
                Logout
              </p>
            </>
          ) : (
            <>
              <Link to="/about" onClick={() => navClick()}>
                About
              </Link>
              <Link to="/login" onClick={() => navClick()}>
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
