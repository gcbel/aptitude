/* DEPENDENCIES */
import { useState } from "react";
import { useTheme } from "../../utils/ThemeContext";

/* DASHBOARD SETTINGS */
export default function DBSettings(dashboard) {
  const { theme, setTheme, themes } = useTheme();

  const array = dashboard.dashboard;
  const [openDBSettings, setOpenDBSettings] = useState(false);

  return (
    <div>
      <div className="subtitle playfair dashboard-title-div">
        <h2 className="dashboard-title">{array.name} Dashboard</h2>
        <p>{openDBSettings ? "∧" : "∨"}</p>
      </div>
      <div className="dark-separator"></div>
      {openDBSettings && (
        <div>
          {/* STYLE */}
          <div className="style-settings">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`card ${theme.clear_bg} ${theme.outer_text} style-card`}
              >
                <div className={`mini-card ${theme.dark}`}></div>
                <div className="right-style-cards">
                  <div className={`mini-card ${theme.medium}`}></div>
                  <div className={`mini-card ${theme.light}`}></div>
                </div>
              </div>
            ))}
          </div>
          <h2 className="title playfair">Objectives</h2>
          <div id="goal-settings"></div>
        </div>
      )}
    </div>
  );
}
