/* DEPENDENCIES */
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTheme } from "../utils/ThemeContext";
import Hourglass from "../components/Loading";
import "../styles/profile.css";

/* PROFILE */
export default function Profile() {
  const { theme, setTheme, themes } = useTheme();

  const loading = false;

  if (loading) {
    return <Hourglass />;
  }

  return (
    <div
      className={`montserrat ${themes[theme].clear_bg} ${themes[theme].inner_text} card`}
      id="profile-page"
    >
      <div className="profile-left">
        <div className={`${themes[theme].dark} card profile-card`}>
          <h3>Hi Gabby!</h3>
        </div>
        <Link
          to="/settings"
          className={`${themes[theme].light} card edit-profile-card`}
        >
          <p className="text-center">Edit profile</p>
        </Link>
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
            <div className={`clear-mini-card`}>
              <i className="fa-regular fa-circle-check"></i>
              <p>Work out</p>
            </div>
            <div className="separator"></div>
            <div className={`clear-mini-card`}>
              <i className="fa-regular fa-circle-check"></i>
              <p>Drink 3 glasses of water</p>
            </div>
            <div className="separator"></div>
            <div className={`clear-mini-card`}>
              <i className="fa-regular fa-circle"></i>
              <p>Rewrite resume</p>
            </div>
            <div className="separator"></div>
            <div className={`clear-mini-card`}>
              <i className="fa-regular fa-circle"></i>
              <p>Email recruiter back</p>
            </div>
          </div>
          <div className={`${themes[theme].light} card todo`}>
            <h4>Tmrw's Todos</h4>
            <div className={`clear-mini-card`}>
              <i className="fa-regular fa-circle"></i>
              <p>Apply to 5 jobs</p>
            </div>
            <div className="separator"></div>
            <div className={`clear-mini-card`}>
              <i className="fa-regular fa-circle"></i>
              <p>Practice 30 minutes of Spanish</p>
            </div>
            <div className="separator"></div>
            <div className={`clear-mini-card`}>
              <i className="fa-regular fa-circle"></i>
              <p>Finish ML certification</p>
            </div>
            <div className="separator"></div>
            <div className={`clear-mini-card`}>
              <i className="fa-regular fa-circle"></i>
              <p>Buy website domain</p>
            </div>
          </div>
          <div className="info-cards">
            <div className={`${themes[theme].dark} card weather`}></div>
            <div className={`${themes[theme].dark} card stocks`}></div>
            <div className={`${themes[theme].dark} card stocks`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
