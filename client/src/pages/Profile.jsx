/* DEPENDENCIES */
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";
import Error from "./Error";
import Hourglass from "../components/Loading";
import Dashboard from "../components/Dashboard";
import "../styles/profile.css";

/* PROFILE */
export default function Profile() {
  const [currentDb, setCurrentDb] = useState(0);

  // Get user and their dashboards
  const user = Auth.getUser();
  const name = user?.name;
  const username = user?.username;

  const { loading, error, data } = useQuery(QUERY_USER_PROFILE, {
    variables: { username },
  });

  const dashboards = data?.userDashboards ?? [];
  const numDbs = dashboards.length;

  const switchDb = (change) => {
    setCurrentDb((prev) => prev + change);
  };

  return (
    <div className="montserrat" id="profile-page">
      {loading && <Hourglass />}

      {error && <Error />}

      {!loading && !error && numDbs > 0 && (
        <div>
          <Dashboard
            key={dashboards[currentDb].id}
            user={user}
            {...dashboards[currentDb]}
          />
          <div className="navigation-buttons large-text playfair">
            {currentDb !== 0 && (
              <button onClick={() => switchDb(-1)}>&lt;</button>
            )}
            <div className="indicators ">
              {dashboards.map((_, index) => (
                <div
                  key={index}
                  className={`indicator-circle ${
                    index === currentDb ? "bg-gray-400" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            {currentDb !== numDbs - 1 && (
              <button onClick={() => switchDb(1)}>&gt;</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
