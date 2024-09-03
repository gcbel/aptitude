/* DEPENDENCIES */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";
import Auth from "../utils/auth";
import HamNav from "./HamNav.jsx";
import "../styles/nav.css";

/* NAV */
export default function Nav() {
  // Regular Nav
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  // Hamburger Nav
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  const handleButtonClick = (e, to, onClick) => {
    if (navigate && to) {
      navigate(to);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <nav className="montserrat min-width">
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
        <div id="main-nav-links">
          <Link to="/about">About</Link>
          {Auth.isLoggedIn() && (
            <Link to="/profile">{Auth.getUser().username}</Link>
          )}
          {!Auth.isLoggedIn() && <Link to="/login">Login</Link>}
        </div>
      </div>
    </nav>
  );
}
