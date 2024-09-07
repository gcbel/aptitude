/* DEPENDENCIES */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { motion, sync, useCycle } from "framer-motion";
import Auth from "../../utils/auth";
import HamNav from "./HamNav.jsx";
import "../../styles/nav.css";

/* NAV */
export default function Nav() {
  // Regular Nav
  const location = useLocation();
  const [openProfileNav, setProfileNav] = useState(false);

  // Hamburger Nav
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  return (
    <nav className="montserrat min-width text-black">
      <Link to="/" className="playfair page-title">
        Aptitude
      </Link>

      {/* HAMBURGER NAV */}
      <motion.div
        id="ham-nav"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        ref={containerRef}
      >
        <HamNav toggle={() => toggleOpen()} />
      </motion.div>

      {/* FULL SIZE NAV */}
      <div id="main-nav">
        <div>
          {Auth.isLoggedIn() && (
            <div id="profile-nav-links">
              <Link to="/profile">{Auth.getUser().username}</Link>
              <p
                id="expand-username"
                onClick={() => setProfileNav((prev) => !prev)}
              >
                {openProfileNav ? "∧" : "∨"}
              </p>
            </div>
          )}
          {openProfileNav && (
            <div id="profile-dropdown">
              <Link
                to="/profile"
                onClick={() => setProfileNav((prev) => !prev)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setProfileNav((prev) => !prev)}
              >
                Settings
              </Link>
              <p
                onClick={() => {
                  Auth.logout();
                  setProfileNav((prev) => !prev);
                }}
              >
                Logout
              </p>
            </div>
          )}
          {!Auth.isLoggedIn() && (
            <div id="main-nav-links">
              <Link to="/about" onClick={() => setProfileNav((prev) => !prev)}>
                About
              </Link>
              <Link to="/login" onClick={() => setProfileNav((prev) => !prev)}>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
