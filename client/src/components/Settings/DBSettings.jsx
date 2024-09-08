/* DEPENDENCIES */
import { useState } from "react";
import { useTheme } from "../../utils/ThemeContext";

/* DASHBOARD SETTINGS */
export default function DBSettings({ dashboard }) {
  const { theme, setTheme, themes } = useTheme();

  const [openDBSettings, setOpenDBSettings] = useState(false);
  const [DBTheme, setDBTheme] = useState(dashboard.theme);

  function changeTheme(index) {
    setDBTheme(index);
  }

  return (
    <div>
      <div className="subtitle playfair dashboard-title-div">
        <h2 className="dashboard-title">{dashboard.name} Dashboard</h2>
        <button
          className="expand-profile"
          onClick={() => setOpenDBSettings((prev) => !prev)}
        >
          {openDBSettings ? "∧" : "∨"}
        </button>
      </div>
      <div className="dark-separator"></div>
      {openDBSettings && (
        <div className="db-settings">
          {/* STYLE */}
          <h3 className="subtitle playfair db-style-title">Style</h3>
          <div className="db-style-settings">
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                className={`card ${theme.clear_bg} ${
                  theme.outer_text
                } style-card ${DBTheme === index && "border border-black"}`}
                onClick={() => changeTheme(index)}
              >
                <div className={`mini-card ${theme.dark}`}></div>
                <div className="right-style-cards">
                  <div className={`mini-card ${theme.medium}`}></div>
                  <div className={`mini-card ${theme.light}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* CONTENT */}
          <h3 className="subtitle playfair db-content-title">Content</h3>
          <div className="montserrat db-content-settings">
            <div className="db-title-setting">
              <p>Dashboard name:</p>
              <input
                type="text"
                id="db-name"
                name="db-name"
                placeholder={dashboard.name}
              ></input>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
