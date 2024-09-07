/* DEPENDENCIES */
import React, { useEffect } from "react";
import { hourglass } from "ldrs";
import { useTheme } from "../utils/ThemeContext";

hourglass.register();

/* HOURGLASS */
const Hourglass = () => {
  const { theme, setTheme, themes } = useTheme();

  useEffect(() => {
    hourglass.register();
  }, []);

  return (
    <div
      className="w-[100vw] h-[90vh] flex justify-center items-center"
      id="hourglass"
    >
      <l-hourglass
        size="40"
        bg-opacity="0.25"
        speed="1.75"
        color={themes[theme].hourglass}
      />
    </div>
  );
};

export default Hourglass;
