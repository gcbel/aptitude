/* DEPENDENCIES */
import { Link } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";

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
  dbTheme,
}) {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className={`${themes[theme].clear_bg} card`}>
      <div className="profile-left">
        <div className={`${themes[theme].dark} card profile-card`}>
          <h3>Hi {user.name}!</h3>
        </div>
        <Link
          to="/settings"
          className={`${themes[theme].light} card edit-profile-card`}
        >
          <p className="text-center">Edit profile</p>
        </Link>
      </div>
      <div className="profile-right">
        <div className={`${themes[theme].medium} card`}>
          <h3>Goals</h3>
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
