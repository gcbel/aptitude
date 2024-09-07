/* DEPENDENCIES */
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "../styles/footer.css";

/* FOOTER */
export default function Footer() {
  return (
    <footer className="footer montserrat text-black">
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
