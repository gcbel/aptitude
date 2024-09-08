/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";

/* ABOUT PAGE */
export default function Error() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className={`about-page montserrat ${themes[theme].outer_text}`}>
      <h1 className="title">
        Welcome to Your All-in-One Productivity Dashboard!
      </h1>
    </div>
  );
}
