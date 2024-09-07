/* DEPENDENCIES */

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
    <div>
      <div className="hidden md:block md:w-[200px] h-[calc(100vh - 50px)]"></div>
      <div
        className="hidden md:block md:w-[200px] p-10 border-r-[0.5px] fixed"
        style={{ position: "sticky", top: "0", left: "0" }}
      >
        <h3 className="med-text">Preferences</h3>
        <div className="pl-4">
          <p onClick={() => handleScroll("style-settings")}>Style</p>
        </div>
        <h3 className="med-text">Objectives</h3>
        <div className="pl-4">
          <p onClick={() => handleScroll("goal-settings")}>Goals</p>
        </div>
      </div>
    </div>
  );
}
