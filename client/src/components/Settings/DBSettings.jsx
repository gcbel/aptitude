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
  const [showWeatherSubmit, setShowWeatherSubmit] = useState(false);

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

  // Change database name
  const handleDBNameInput = (event) => {
    const newName = event.target.value;
    setChangedDBName(newName);
    if (event.target.value.trim() !== "") {
      setShowDBNameSubmit(true);
    }
  };

  const onSubmitDBName = async () => {
    try {
      setShowDBNameSubmit(false);
      setDBName(changedDBName);
      const { data } = await changeDBName({
        variables: {
          id: dashboard._id,
          name: changedDBName,
        },
      });
    } catch (error) {
      console.error("Error changing DB name:", error);
    }
  };

  // Change database weather

  return (
    <div>
      <div
        className="subtitle playfair dashboard-title-div"
        onClick={() => setOpenDBSettings((prev) => !prev)}
      >
        <h2 className="dashboard-title">{DBName} Dashboard</h2>
        <button className="expand-profile">{openDBSettings ? "∧" : "∨"}</button>
      </div>
      <div className="settings-separator"></div>
      {openDBSettings && (
        <div className="db-settings">
          {/* GENERAL */}
          <h3 className="subtitle playfair settings-section-title">General</h3>
          <div className="montserrat db-content-settings">
            <div className="db-content-setting">
              <p className="xs:mb-[0.78rem]">Dashboard name:</p>
              <input
                type="text"
                id="db-name"
                name="db-name"
                value={changedDBName}
                placeholder={DBName}
                onChange={handleDBNameInput}
              ></input>
              {showDBNameSubmit && (
                <button
                  onClick={() => onSubmitDBName()}
                  className="settings-button"
                >
                  Save
                </button>
              )}
            </div>
          </div>

          {/* STYLE */}
          <h3 className="subtitle playfair settings-section-title">Style</h3>
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

          {/* WEATHER */}
          <h3 className="subtitle playfair settings-section-title">Weather</h3>
          <div className="montserrat db-content-settings">
            {dashboard.weather ? (
              <div className="db-content-setting">
                <p className="xs:mb-[0.78rem]">Zipcode:</p>
                <input
                  type="text"
                  id="db-name"
                  name="db-name"
                  placeholder={dashboard.weather}
                ></input>
              </div>
            ) : (
              <button className="settings-button">Add weather</button>
            )}
          </div>

          {/* STOCKS */}
          <h3 className="subtitle playfair settings-section-title">Stocks</h3>
          <div className="montserrat db-content-settings">
            {dashboard.stocks.length > 0 && (
              <div className="db-content-setting">
                <p className="xs:mb-[0.78rem]">Stocks:</p>
                {dashboard.stocks.map((stock, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      id="stock-name"
                      name="stock-name"
                      placeholder={stock}
                    ></input>
                  </div>
                ))}
              </div>
            )}
            {dashboard.stocks.length < 3 && (
              <button className="settings-button">Add stock</button>
            )}
          </div>

          {/* TODOS */}
          <h3 className="subtitle playfair settings-section-title">Todos</h3>
          <div className="montserrat db-content-settings">
            {dashboard.todos.length > 0 && (
              <div className="db-content-setting">
                <p className="xs:mb-[0.78rem]">Todo list title:</p>
                {dashboard.todos.map((todo, index) => (
                  <div key={todo.id}>
                    <input
                      type="text"
                      id="todo-name"
                      name="todo-name"
                      placeholder={todo.title}
                    ></input>
                  </div>
                ))}
              </div>
            )}
            {dashboard.todos.length + dashboard.lists.length < 3 && (
              <button className="settings-button">Add todo list</button>
            )}
          </div>

          {/* LISTS */}
          <h3 className="subtitle playfair settings-section-title">Lists</h3>
          <div className="montserrat db-content-settings">
            {dashboard.lists.length > 0 && (
              <div className="db-content-setting">
                <p className="xs:mb-[0.78rem]">List title:</p>
                {dashboard.lists.map((list, index) => (
                  <div key={list.id}>
                    <input
                      type="text"
                      id="list-name"
                      name="list-name"
                      placeholder={list.name}
                    ></input>
                  </div>
                ))}
              </div>
            )}
            {dashboard.todos.length + dashboard.lists.length < 3 && (
              <button className="settings-button">Add list</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
