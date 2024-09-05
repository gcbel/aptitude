/* DEPENDENCIES */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useTheme } from "../utils/ThemeContext";
import { QUERY_USER_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";
import Hourglass from "../components/Loading";
import "../styles/profile.css";

/* PROFILE */
export default function Profile() {
  const { theme, setTheme, themes } = useTheme();

  // Get user and their dashboards
  const username = Auth.getUser()?.username;

  const { loading, error, data } = useQuery(QUERY_USER_PROFILE, {
    variables: { username },
  });

  if (loading) {
    return <Hourglass />;
  }

  if (error) {
    console.log(error);
    return <p>Error loading dashboards</p>;
  }

  const dashboards = data.userDashboards;
  console.log(dashboards);

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
    </div>
  );
}
