/* DEPENDENCIES */
import React from "react";
import { useState, useEffect } from "react";
import { themes } from "../utils/themes";
import Hourglass from "../components/Loading";
import "../styles/home.css";

const loading = false;

/* HOME PAGE */
export default function Home() {
  // Get saved theme or set to default theme
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme !== null ? parseInt(savedTheme) : 0;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (loading) {
    return <Hourglass />;
  }

  return (
    <div className={`${themes[theme].outer_text}`} id="home-page">
      <h1 className="title playfair">Personalize your productivity.</h1>
      <h2 className="title playfair">Meet your goals.</h2>

      {/* INTRODUCTION */}
      <div className="montserrat" id="intro-cards">
        <div className={`card ${themes[theme].dark}`}>
          <h3>Meep</h3>
        </div>
        <div className={`card ${themes[theme].medium}`}>
          <h3>Stay organized</h3>
        </div>
        <div className={`card ${themes[theme].light}`}>
          <h3>Stay motivated</h3>
        </div>
      </div>

      {/* EXAMPLE PROFILE */}
      <h2 className="title playfair">Centralize your productivity.</h2>
      <div className={`${themes[theme].clear_bg}`} id="example-profile">
        <h2 className={`playfair ${themes[theme].outer_text}`}>
          Good morning, Gabby!
        </h2>
        <div className="card">
          <h3>Todo</h3>
        </div>
      </div>

      {/* CUSTOMIZABILITY */}
      <h2 className="title playfair">Customize</h2>
      <div id="customize-cards">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`card ${theme.dark} ${theme.inner_text}`}
            onClick={() => setTheme(theme.id)}
          >
            <h2>{theme.name}</h2>
            <div className={`mini-card-outer ${theme.clear_bg}`}>
              <div className={`mini-card ${theme.medium}`}></div>
              <div className={`mini-card ${theme.light}`}></div>
              <div className={`mini-card ${theme.medium}`}></div>
              <div className={`mini-card ${theme.dark}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
