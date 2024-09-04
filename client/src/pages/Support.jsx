/* DEPENDENCIES */
import { useTheme } from "../utils/ThemeContext";

/* ABOUT PAGE */
export default function Error() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className={`about-page montserrat ${themes[theme].outer_text}`}>
      <h1 className="title">Support</h1>
      <h2 className="title">FAQ</h2>
      <p>Why Aptitude?</p>
      <p>
        Aptitude is a free, easy to use site that wants to help you achieve your
        goals.
      </p>
      <h2 className="title">Contact Us</h2>
      <p>Questions? Comments? Contact us!</p>
      <p>support@learnwithaptitude.com</p>
    </div>
  );
}
