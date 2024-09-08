/* DEPENDENCIES */
import { useTheme } from "../../utils/ThemeContext";

/* DASHBOARD SETTINGS */
export default function DBSettings() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div>
      <h2 className="title playfair">Preferences</h2>
      <div id="style-settings">
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
      <h2 className="title playfair">Objectives</h2>
      <div id="goal-settings"></div>
    </div>
  );
}
