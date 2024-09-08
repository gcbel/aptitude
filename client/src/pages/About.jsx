/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";
import { example } from "../utils/example";
import "../styles/about.css";

import Goals from "../components/Dashboard/Goals";

/* ABOUT PAGE */
export default function Error() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div
      className={`about-page montserrat ${themes[theme].outer_text}`}
      id="about-page"
    >
      <h1 id="about-title">
        We set out to make a beautiful, goal-focused dashboard that allows users
        to track everything in one place.
      </h1>
      {/* GOALS */}
      <div id="about-div">
        <div className="large-text">
          <h2 className="playfair title font-medium">
            {" "}
            Set goals and reach them
          </h2>
          <p>
            This is a tool crafted to empower individuals to take control of
            their time and goals effectively.
          </p>
          <div className="dark-separator"></div>
          <p>
            This project is a culmination of my passion for technology,
            productivity, and the science of motivation.
          </p>
        </div>
        <div id="about-goals">
          <Goals goals={example[0].goals} themeArray={themes[theme]} />
          <p className="small-text text-center">
            Click around to explore how we keep goals top of mind
          </p>
        </div>
      </div>
      {/* HABITS */}
    </div>
  );
}
