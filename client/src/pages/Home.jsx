/* DEPENDENCIES */
import { Link, useLocation, useNavigate } from "react-router-dom";
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
        {/* KEEP EVERYTHING CARD */}
        <div className={`card ${themes[theme].dark}`} id="first-intro-card">
          <h3>Keep everything in one place</h3>
          <div
            className={`${themes[theme].clear_bg} ${themes[theme].outer_text} mini-card`}
          >
            <i className="fa-regular fa-circle-check"></i>
            <p>Organize your todos, goals, reminders, and more</p>
          </div>
          <div
            className={`${themes[theme].clear_bg} ${themes[theme].outer_text} mini-card`}
          >
            <i className="fa-regular fa-circle-check"></i>
            <p>Integrate your calendar and track your stock picks</p>
          </div>
          <div
            className={`${themes[theme].clear_bg} ${themes[theme].outer_text} mini-card`}
          >
            <i className="fa-regular fa-circle"></i>
            <p>Check the weather while planning your day</p>
          </div>
          <div
            className={`${themes[theme].clear_bg} ${themes[theme].outer_text} mini-card`}
          >
            <i className="fa-regular fa-circle"></i>
            <p>Get reminders about upcoming birthdays</p>
          </div>
        </div>
        {/* GET MOTIVATED CARD */}
        <div className={`card ${themes[theme].light}`} id="sec-intro-card">
          <h3>Get motivated</h3>
          <div className={`clear-mini-card`}>
            <i className="fa-regular fa-circle-check"></i>
            <p>
              Keep your goals top of mind with milestones and daily reminders
            </p>
          </div>
          <div className="separator"></div>
          <div className={`clear-mini-card`}>
            <i className="fa-regular fa-circle-check"></i>
            <p>Integrate your goals into your every day todos</p>
          </div>
        </div>
        {/* PHYSCOLOGY */}
        <div className={`card ${themes[theme].medium}`} id="third-intro-card">
          <h3>Psychology-backed productivity techniques</h3>
          <div className="separator mt-2"></div>
          <div className={`clear-mini-card`}>
            <i className="fa-regular fa-circle-check"></i>
            <p>Control your productivity style</p>
          </div>
          <div className="button-outer pb-2">
            <Link
              to="/survey"
              className={`${themes[theme].clear_bg} ${themes[theme].outer_text} button large-text`}
            >
              Get started <span className="font-bold not-italic"> →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* EXAMPLE PROFILE */}
      <h2 className="main-title playfair">Centralize your productivity.</h2>
      <div
        className={`${themes[theme].clear_bg} ${themes[theme].inner_text} card`}
        id="example-profile"
      >
        <div className="profile-left">
          <div className={`${themes[theme].dark} card profile-card`}>
            <h3>Hi Gabby!</h3>
          </div>
          <div className={`${themes[theme].light} card edit-profile-card`}>
            <p className="text-center">Edit profile</p>
          </div>
        </div>
        <div className="profile-right">
          <div className={`${themes[theme].medium} card`}>
            <h3>Goals</h3>
            <div className={`${themes[theme].outer_text} goals`}>
              <div className={`${themes[theme].clear_bg} mini-card goal-card`}>
                Workout 4x a week
              </div>
              <div className={`${themes[theme].clear_bg} mini-card goal-card`}>
                Learn Spanish
              </div>
              <div className={`${themes[theme].clear_bg} mini-card goal-card`}>
                Get a new job
              </div>
            </div>
          </div>
          <div className="profile-main">
            <div className={`${themes[theme].light} card todo`}>
              <h4>Today's Todos</h4>
            </div>
            <div className={`${themes[theme].light} card todo`}>
              <h4>Tmrw's Todos</h4>
            </div>
            <div>
              <div className={`${themes[theme].medium} card`}></div>
              <div className={`${themes[theme].medium} card`}></div>
            </div>
          </div>
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
