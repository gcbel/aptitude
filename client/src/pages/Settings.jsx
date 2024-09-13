/* DEPENDENCIES */
import { QUERY_USER_PROFILE } from "../utils/queries";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import "../styles/settings.css";

import Hourglass from "../components/Loading";
import ProfileSettings from "../components/Settings/ProfileSettings";
import DBSettings from "../components/Settings/DBSettings";

/* SETTINGS */
export default function Settings() {
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  // Get user and their dashboards
  const user = Auth.getUser();
  const username = user?.username;

  const { loading, error, data } = useQuery(QUERY_USER_PROFILE, {
    variables: { username },
  });

  const dashboards = data?.userDashboards ?? [];
  const [dbs, setDbs] = useState(dashboards);
  const [numDbs, setNumDbs] = useState(dashboards.length);

  // Remove a dashboard
  const handleDeleteDB = (index) => {
    setDbs((prev) => prev.filter((_, i) => i !== index));
    setNumDbs(dbs.length);
  };

  return (
    <div>
      {loading && <Hourglass />}

      {error && <Error />}

      {!loading && !error && numDbs > 0 && (
        <div id="settings-and-nav">
          <div>
            <div className="montserrat" id="settings-nav">
              <h3
                id={!showProfileSettings ? "selected-settings-title" : ""}
                onClick={() => setShowProfileSettings(false)}
              >
                Dashboards
              </h3>
              <h3
                id={showProfileSettings ? "selected-settings-title" : ""}
                onClick={() => setShowProfileSettings(true)}
              >
                Profile
              </h3>
            </div>
          </div>
          {showProfileSettings ? (
            <ProfileSettings user={user} />
          ) : (
            <div id="settings-right">
              {dbs.map((dashboard, index) => (
                <div key={index}>
                  <DBSettings
                    dashboard={dashboard}
                    dbIndex={index}
                    onDeleteDB={handleDeleteDB}
                  />
                </div>
              ))}
              {numDbs < 8 && (
                <div id="create-new-db-button-div">
                  <button
                    className="playfair large-text"
                    id="create-new-db-button"
                  >
                    New dashboard +
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
