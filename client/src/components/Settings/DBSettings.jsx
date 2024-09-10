/* DEPENDENCIES */
import { CHANGE_THEME, CHANGE_DB_NAME } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useTheme } from "../../utils/ThemeContext";

/* DASHBOARD SETTINGS */
export default function DBSettings({ dashboard }) {
  const { theme, setTheme, themes } = useTheme();

  const [changeTheme] = useMutation(CHANGE_THEME);
  const [changeDBName] = useMutation(CHANGE_DB_NAME);

  const [openDBSettings, setOpenDBSettings] = useState(false);
  const [showDBNameSubmit, setShowDBNameSubmit] = useState(false);

  const [DBTheme, setDBTheme] = useState(dashboard.theme);
  const [DBName, setDBName] = useState(dashboard.name);
  const [changedDBName, setChangedDBName] = useState(dashboard.name);

  // Change dashboard's theme
  const onThemeChange = async (index) => {
    setDBTheme(index);
    try {
      const { data } = await changeTheme({
        variables: {
          id: dashboard._id,
          theme: index,
        },
      });
    } catch (error) {
      console.error("Error persisting theme:", error);
    }
  };

  // Handle changing database name
  const handleDBNameInput = (event) => {
    const newName = event.target.value;
    setChangedDBName(newName);
    if (event.target.value.trim() !== "") {
      setShowDBNameSubmit(true);
    }
  };

  const handleDBNameBlur = () => {
    setShowDBNameSubmit(false);
  };

  const onSubmitDBName = async () => {
    try {
      setDBName(changedDBName);
      const { data } = await changeDBName({
        variables: {
          id: dashboard._id,
          name: changedDBName,
        },
      });
      console.log("Changed db name:", DBName);
    } catch (error) {
      console.error("Error changing DB name:", error);
    }
  };

  return (
    <div>
      <div className="subtitle playfair dashboard-title-div">
        <h2 className="dashboard-title">{DBName} Dashboard</h2>
        <button
          className="expand-profile"
          onClick={() => setOpenDBSettings((prev) => !prev)}
        >
          {openDBSettings ? "∧" : "∨"}
        </button>
      </div>
      <div className="dark-separator"></div>
      {openDBSettings && (
        <div className="db-settings">
          {/* STYLE */}
          <h3 className="subtitle playfair db-style-title">Style</h3>
          <div className="db-style-settings">
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                className={`card ${theme.clear_bg} ${
                  theme.outer_text
                } style-card ${DBTheme === index && "border border-black"}`}
                onClick={() => onThemeChange(index)}
              >
                <div className={`mini-card ${theme.dark}`}></div>
                <div className="right-style-cards">
                  <div className={`mini-card ${theme.medium}`}></div>
                  <div className={`mini-card ${theme.light}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* CONTENT */}
          <h3 className="subtitle playfair db-content-title">Content</h3>
          <div className="montserrat db-content-settings">
            <div className="db-title-setting">
              <p className="mb-3">Dashboard name:</p>
              <input
                type="text"
                id="db-name"
                name="db-name"
                value={changedDBName}
                placeholder={DBName}
                onChange={handleDBNameInput}
              ></input>
              {showDBNameSubmit && (
                <button onClick={() => onSubmitDBName()}>Submit</button>
              )}
            </div>
            <div className="db-weather-setting">
              <p className="mb-3">Weather zipcode:</p>
              <input
                type="text"
                id="db-name"
                name="db-name"
                placeholder={dashboard.weather}
              ></input>
            </div>
            <div className="db-stock-setting">
              <p className="mb-3">Stocks:</p>
              <div>
                {dashboard.stocks?.map((stock, index) => (
                  <div key={theme.id}>
                    <input
                      type="text"
                      id="db-name"
                      name="db-name"
                      placeholder={stock}
                    ></input>
                  </div>
                ))}
                {dashboard.stocks?.length < 3 && <p>+</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
