/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";

/* SETTINGS PAGE */
export default function Settings() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div>
      <h2 className="title playfair">Customize</h2>
      <div id="customize-cards">
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
    </div>
  );
}
