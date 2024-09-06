/* DEPENDENCIES */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useTheme } from "../utils/ThemeContext";
import { QUERY_USER_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";
import Hourglass from "../components/Loading";
import Error from "./Error.jsx";
import "../styles/profile.css";

/* PROFILE */
export default function Profile() {
  const { theme, setTheme, themes } = useTheme();

  // Get user and their dashboards
  const user = Auth.getUser();
  const name = user?.name;
  const username = user?.username;

  const { loading, error, data } = useQuery(QUERY_USER_PROFILE, {
    variables: { username },
  });

  if (loading) {
    return <Hourglass />;
  }

  if (error) {
    console.log(error);
    return <Error />;
  }

  const dashboards = data.userDashboards;

  return (
    <div
      className={`montserrat ${themes[theme].clear_bg} ${themes[theme].inner_text} card`}
      id="profile-page"
    >
      <div className="profile-left">
        <div className={`${themes[theme].dark} card profile-card`}>
          <h3>Hi {name}!</h3>
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
            {dashboards[0].goals?.map((goal, index) => (
              <div
                key={index}
                className={`${themes[theme].clear_bg} mini-card goal-card`}
              >
                {goal.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
