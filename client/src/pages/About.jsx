/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";

/* ABOUT PAGE */
export default function Error() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className={`about-page montserrat ${themes[theme].outer_text}`}>
      <h1 className="text-2xl lg:text-3xl text-center mx-6 sm:mx-12 md:mx-28 lg:mx-64 font-medium">
        We set out to make a beautiful, goal-focused dashboard that allows users
        to track everything in one place.
      </h1>
      <p></p>
    </div>
  );
}
