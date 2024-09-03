/* DEPENDENCIES */
import React from "react";
import { useState } from "react";
import Hourglass from "../components/Loading";
import "../styles/home.css";

const loading = false;

const themes = [
  {
    id: 0,
    name: "Default",
    outer_text: "text-slate-900",
    inner_text: "text-white",
    dark: "bg-slate-900",
    medium: "bg-blue-950",
    light: "bg-slate-800",
    clear_bg: "bg-slate-300",
  },
  {
    id: 1,
    name: "Neutral",
    outer_text: "text-stone-900",
    inner_text: "text-white",
    dark: "bg-stone-900",
    medium: "bg-stone-800",
    light: "bg-neutral-900",
    clear_bg: "bg-stone-300",
  },
  {
    id: 2,
    name: "Colorful",
    outer_text: "text-black",
    inner_text: "text-white",
    dark: "bg-blue-950",
    medium: "bg-cyan-700",
    light: "bg-pink-900",
    clear_bg: "bg-pink-100",
  },
];

/* HOME PAGE */
export default function Home() {
  const [theme, setTheme] = useState(0);

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
