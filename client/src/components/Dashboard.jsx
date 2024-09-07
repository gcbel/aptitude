/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";

import Goals from "./Dashboard/Goals";
import Todos from "./Dashboard/Todos";
import Lists from "./Dashboard/Lists";
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
          {/* Weather */}

          {/* Stocks */}
          {stocks && <Stocks />}
          {/* Habits */}
          {habits && <Habits habits={habits} themeArray={themeArray} />}
        </div>
      </div>
      <div className="profile-right">
        {goals && <Goals goals={goals} themeArray={themeArray} />}
        <div className="todos-and-lists">
          {todos && <Todos todos={todos} themeArray={themeArray} />}
          {lists && <Lists lists={lists} themeArray={themeArray} />}
        </div>
      </div>
    </div>
  );
}
