/* DEPENDENCIES */
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
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
