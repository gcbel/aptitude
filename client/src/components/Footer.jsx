/* DEPENDENCIES */
import React from "react";
import "../styles/footer.css";

/* FOOTER */
export default function Footer() {
  return (
    <footer className="footer montserrat">
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
