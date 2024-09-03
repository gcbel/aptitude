/* DEPENDENCIES */
import React from "react";
import { useState } from "react";
import Hourglass from "../components/Loading";
import "../styles/home.css";

const loading = false;

const themes = [
  {
    id: 0,
    name: "default",
    outer_text: "text-slate-900",
    inner_text: "text-white",
    dark: "bg-slate-900",
    medium: "bg-blue-950",
    light: "bg-slate-800",
  },
  {
    id: 1,
    name: "neutral",
    outer_text: "text-stone-900",
    inner_text: "text-white",
    dark: "bg-stone-900",
    medium: "bg-stone-800",
    light: "bg-neutral-900",
  },
  {
    id: 1,
    name: "colorful",
    outer_text: "text-black",
    inner_text: "text-white",
    dark: "bg-blue-950",
    medium: "bg-cyan-700",
    light: "bg-pink-900",
  },
];

/* HOME PAGE */
export default function Home() {
  const [theme, setTheme] = useState(0);

  if (loading) {
    return <Hourglass />;
  }

  return (
    <div id="home-page">
      <h1 className={`title playfair ${themes[theme].outer_text}`}>
        Personalize your productivity. Meet your goals.
      </h1>

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
      <div>
        <h2 className={`title playfair ${themes[theme].outer_text}`}>
          Centralize your productivity.
        </h2>
      </div>

      {/* CUSTOMIZABILITY */}
      <h2 className={`title playfair ${themes[theme].outer_text}`}>
        Customize
      </h2>
      <div id="customize-cards">
        <div
          className={`card ${themes[0].dark} ${themes[0].inner_text}`}
          onClick={() => setTheme(0)}
        >
          <h2>{themes[0].name}</h2>
          <div>
            <div className="mini-card"></div>
            <div className="mini-card"></div>
            <div className="mini-card"></div>
            <div className="mini-card"></div>
          </div>
        </div>
        <div
          className={`card ${themes[1].dark}`}
          onClick={() => setTheme(1)}
        ></div>
        <div
          className={`card ${themes[2].dark}`}
          onClick={() => setTheme(2)}
        ></div>
      </div>
    </div>
  );
}
