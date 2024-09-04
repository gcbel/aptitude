/* DEPENDENCIES */
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useTheme } from "../utils/ThemeContext";
import "../styles/footer.css";

/* FOOTER */
export default function Footer() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <footer className={`footer montserrat ${themes[theme].outer_text}`}>
      <div className="footer-container">
        <p className="footer-text">
          &copy; 2024 Aptitude. All rights reserved.
        </p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/support">Support</Link>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
