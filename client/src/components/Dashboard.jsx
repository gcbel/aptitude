/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";

import Goals from "./Dashboard/Goals";
import Habits from "./Dashboard/Habits";
import Stocks from "./Dashboard/Stocks";

/* DASHBOARD */
export default function Dashboard({
  user,
  name,
  goals,
  lists,
  todos,
  habits,
  stocks,
  weather,
  theme,
}) {
  const { ogTheme, setTheme, themes } = useTheme();
  const themeArray = themes[theme];

  return (
    <div className={`${themeArray.clear_bg} card`} id="dashboard">
      <div className="profile-left">
        {/* Title */}
        <div className={`${themeArray.dark} card profile-card`}>
          <h3>{name == "Main" ? `Hi ${user.name}!` : name}</h3>
        </div>
        <div>
          {/* Habits */}
          {habits && <Habits habits={habits} themeArray={themeArray} />}
          {/* Stocks */}
          {stocks && <Stocks />}
        </div>
      </div>
      <div className="profile-right">
        {goals && <Goals goals={goals} themeArray={themeArray} />}
      </div>
    </div>
  );
}
