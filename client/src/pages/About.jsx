/* DEPENDENCIES */
import { Link } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";
import { example } from "../utils/example";
import "../styles/about.css";

import Goals from "../components/Dashboard/Goals";
import Todos from "../components/Dashboard/Todos";
import Habits from "../components/Dashboard/Habits";
import Stocks from "../components/Dashboard/Stocks";

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
      <div className="about-div">
        <div className="large-text about-text-div">
          <h2 className="playfair title font-medium">
            Set goals and reach them
          </h2>
          <p>
            Crafted to empower you to take control of your time and goals
            effectively.
          </p>
          <div className="dark-separator"></div>
          <p>Set and track your personal and professional objectives.</p>
        </div>
        <div className="about-example-div">
          <Goals goals={example[0].goals} themeArray={themes[theme]} />
          <p className="small-text text-center mt-3">
            Click around to explore how we keep goals top of mind
          </p>
        </div>
      </div>
      {/* TODOS */}
      <div className="about-div" id="example-todos">
        <div className="about-example-div">
          <Todos todos={example[0].todos} themeArray={themes[theme]} />
          <p className="small-text text-center mt-3">
            Add and delete todos freely
          </p>
        </div>
        <div className="large-text about-text-div">
          <h2 className="playfair title font-medium">
            Keep every to-do and list in one place
          </h2>
          <p>Visualize and manage your responsibilities more effectively.</p>
          <div className="dark-separator"></div>
          <p>Simplify and enhance how you manage your daily life.</p>
        </div>
      </div>
      {/* HABITS */}
      <div className="about-div">
        <div className="large-text about-text-div">
          <h2 className="playfair title font-medium">Track your habits</h2>
          <p>Seamlessly keep track of what's going on in your life.</p>
          <div className="dark-separator"></div>
          <p>Get motivated to form and keep good habits.</p>
        </div>
        <div className="about-example-div">
          <Habits habits={example[0].habits} themeArray={themes[theme]} />
          <p className="small-text text-center mt-3">
            Explore the habit tracker
          </p>
        </div>
      </div>
      {/* STOCKS */}
      <div className="about-div">
        <div className="about-example-div">
          <Stocks />
        </div>
        <div className="large-text about-text-div">
          <h2 className="playfair title font-medium">
            Stay updated on your investments
          </h2>
          <p>Keep track of up to 15 stocks, cryptocurrencies, and ETFs.</p>
          <div className="dark-separator"></div>
          <p>Watch your investments without ever leaving the page.</p>
        </div>
      </div>
      <div className="about-div flex-col gap-1">
        <h2 className="playfair title font-medium">And so much more</h2>
        <Link
          to="/survey"
          className={`${themes[theme].clear_bg} ${themes[theme].outer_text} button large-text`}
        >
          Get started <span className="font-bold not-italic"> →</span>
        </Link>
      </div>
      {/* DEVELOPER */}
      <div className="about-div">
        <h2 className="playfair title font-medium">Meet the team</h2>
      </div>
    </div>
  );
}
