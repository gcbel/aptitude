/* DEPENDENCIES */
import React, { useEffect } from "react";
import { hourglass } from "ldrs";

hourglass.register();

/* HOURGLASS */
const Hourglass = ({
  size = "40",
  bgOpacity = "0.1",
  speed = "1.75",
  color = "black",
}) => {
  useEffect(() => {
    hourglass.register();
  }, []);

  return (
    <div id="hourglass">
      <l-hourglass
        size={size}
        bg-opacity={bgOpacity}
        speed={speed}
        color={color}
      />
    </div>
  );
};

export default Hourglass;
