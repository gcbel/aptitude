/* DEPENDENCIES */
import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "../utils/ThemeContext";
import Hourglass from "../components/Loading";
import "../styles/home.css";

const loading = false;

/* HOME PAGE */
export default function Home() {
  const { theme, setTheme, themes } = useTheme();

  if (loading) {
    return <Hourglass />;
  }

  return (
    <div className={`montserrat ${themes[theme].outer_text}`} id="home-page">
      <h1 className="main-title playfair">Personalize your productivity.</h1>
      <h2 className="main-title playfair">Meet your goals.</h2>

      {/* INTRODUCTION */}
      <div className={`${themes[theme].inner_text}`} id="intro-cards">
        <div className={`card ${themes[theme].dark}`} id="first-intro-card">
          <h3>Meep</h3>
        </div>
        <div className={`card ${themes[theme].medium}`} id="sec-intro-card">
          <h3>Stay organized</h3>
        </div>
        <div className={`card ${themes[theme].light}`} id="third-intro-card">
          <h3>Stay motivated</h3>
          <button>Get started</button>
        </div>
      </div>

      {/* EXAMPLE PROFILE */}
      <h2 className="main-title playfair">Centralize your productivity.</h2>
      <div
        className={`${themes[theme].clear_bg} ${themes[theme].inner_text}`}
        id="example-profile"
      >
        <h2 className="playfair">Good morning, Gabby!</h2>
        <div className="card">
          <h3>Todo</h3>
        </div>
      </div>
      <div id="customize-section">
        <p className="title playfair">And customize it to your liking:</p>
        <div id="customize-cards">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`customize-card ${theme.medium}`}
              onClick={() => setTheme(theme.id)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
