/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";

/* ERROR PAGE */
export default function Error() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className={`error-page ${themes[theme].outer_text}`}>
      <h1 className="title">This page doesn't exist!</h1>
    </div>
  );
}
