/* DEPENDENCIES */
import { useTheme } from "../../utils/ThemeContext";
import { icons } from "../../utils/icons";

/* HABITS */
export default function Habits(habits) {
  const { theme, setTheme, themes } = useTheme();
  const array = habits.habits;

  return (
    <div className="card">
      <h4>Habits</h4>
      {array.map((habit, index) => (
        <div key={index} className={`mini-card habit-card `}>
          <i className="fa-regular fa-square-check"></i>
          <div>
            <i className={`${icons[habit.icon]}`}></i>
            <p>{habit.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
