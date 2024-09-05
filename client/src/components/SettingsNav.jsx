/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";

/* NAV FOR SETTINGS */
export default function Nav() {
  return (
    <div className="hidden lg:block lg:w-[200px] p-10 border-r-[0.5px]">
      <h3 className="med-text">Preferences</h3>
      <div className="pl-4">
        <p>Style</p>
      </div>
      <h3 className="med-text">Objectives</h3>
      <div className="pl-4">
        <p>Goals</p>
      </div>
    </div>
  );
}
