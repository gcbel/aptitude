/* DEPENDENCIES */
import { useTheme } from "../../utils/ThemeContext";

/* NAV FOR SETTINGS */
export default function Nav() {
  // Handle scrolling to relevant portion in settings
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hidden md:block md:w-[200px] p-10 border-r-[0.5px]">
      <h3 className="med-text">Preferences</h3>
      <div className="pl-4">
        <p onClick={() => handleScroll("style-settings")}>Style</p>
      </div>
      <h3 className="med-text">Objectives</h3>
      <div className="pl-4">
        <p onClick={() => handleScroll("goal-settings")}>Goals</p>
      </div>
    </div>
  );
}
