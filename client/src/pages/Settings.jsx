/* DEPENDENCIES */
import { useQuery } from "@apollo/client";
import { QUERY_USER_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";
import "../styles/settings.css";

import Hourglass from "../components/Loading";
import Nav from "../components/Settings/SettingsNav";
import DBSettings from "../components/Settings/DBSettings";

/* SETTINGS */
export default function Settings() {
  // Get user and their dashboards
  const user = Auth.getUser();
  const username = user?.username;

  const { loading, error, data } = useQuery(QUERY_USER_PROFILE, {
    variables: { username },
  });

  const dashboards = data?.userDashboards ?? [];
  const numDbs = dashboards.length;

  return (
    <div>
      {loading && <Hourglass />}

      {error && <Error />}

      {!loading && !error && numDbs > 0 && (
        <div id="settings-and-nav">
          <Nav />
          <div id="settings-right">
            {dashboards.map((dashboard, index) => (
              <div key={index}>
                <DBSettings dashboard={dashboard} />
              </div>
            ))}
            {numDbs < 8 && (
              <div id="create-new-db-button-div">
                <button
                  className="playfair settings-button large-text"
                  id="create-new-db-button"
                >
                  New dashboard +
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
