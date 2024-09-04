/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";

/* ABOUT PAGE */
export default function Error() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className={`about-page montserrat ${themes[theme].outer_text}`}>
      <h1 className="title">
        We set out to make a beautiful, easy to use productivity tool based on
        research.
      </h1>
      <p>Meet the team</p>
      <div>Gabrielle Belanger</div>
    </div>
  );
}
