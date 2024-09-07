/* DEPENDENCIES */
import { Link } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";
import { icons } from "../utils/icons";

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

  return (
    <div className={`${themes[theme].clear_bg} card`} id="dashboard">
      <div className="profile-left">
        {/* Title */}
        <div className={`${themes[theme].dark} card profile-card`}>
          <h3>{name == "Main" ? `Hi ${user.name}!` : name}</h3>
        </div>
        {/* Habits */}
        {habits && <Habits habits={habits} theme={theme} />}
        {/* Stocks */}
        {stocks && <Stocks />}
      </div>
      <div className="profile-right">
        <div className={`${themes[theme].medium} card`}>
          <h4>Goals</h4>
          <div className={`${themes[theme].outer_text} goals`}>
            {goals?.map((goal, index) => (
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
