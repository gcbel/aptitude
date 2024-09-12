/* DEPENDENCIES */
import { CHANGE_THEME, CHANGE_DB_NAME, DELETE_DB } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useTheme } from "../../utils/ThemeContext";

import TodoSettings from "./TodoSettings";
import ListSettings from "./ListSettings";

/* DASHBOARD SETTINGS */
export default function DBSettings({ dashboard }) {
  const { theme, setTheme, themes } = useTheme();

  // Mutations
  const [changeTheme] = useMutation(CHANGE_THEME);
  const [changeDBName] = useMutation(CHANGE_DB_NAME);
  const [deleteDB] = useMutation(DELETE_DB);

  // Track changing states
  const [openDBSettings, setOpenDBSettings] = useState(false);
  const [showDBNameSuccess, setShowDBNameSuccess] = useState(false);
  const [showDBNameFailure, setShowDBNameFailure] = useState(false);
  const [DBTheme, setDBTheme] = useState(dashboard.theme);
  const [DBName, setDBName] = useState(dashboard.name);
  const [changedDBName, setChangedDBName] = useState(dashboard.name);
  const [todos, setTodos] = useState(dashboard.todos);
  const [lists, setLists] = useState(dashboard.lists);

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
  };

  const onSubmitDBName = async () => {
    // Prevent user from changing to an empty dashboard name
    if (changedDBName === "") {
      setShowDBNameSuccess(false);
      setShowDBNameFailure(true);

      // Check whether dashboard name is changed
    } else if (changedDBName === DBName) {
      setShowDBNameSuccess(false);
      setShowDBNameFailure(false);

      // Change dashboard name if non-empty changed name
    } else {
      try {
        setDBName(changedDBName);
        const { data } = await changeDBName({
          variables: {
            id: dashboard._id,
            name: changedDBName,
          },
        });
        setShowDBNameFailure(false);
        setShowDBNameSuccess(true);
      } catch (error) {
        console.error("Error changing DB name:", error);
      }
    }
  };

  // Add new todo
  const addNewTodoList = async () => {
    setTodos((prev) => [...prev, { title: "" }]);
  };

  // Remove a todo
  const handleDeleteTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  // Add new list
  const addNewList = async () => {
    setLists((prev) => [...prev, { title: "" }]);
  };

  // Remove a list
  const handleDeleteList = (index) => {
    setLists((prev) => prev.filter((_, i) => i !== index));
  };

  // Delete dashboard
  const onDeleteDashboard = async (index) => {
    try {
      const { data } = await deleteDB({
        variables: {
          id: dashboard._id,
        },
      });
      if (data.deleteDB) {
        console.log("Dashboard deleted");
      } else {
        console.error("Failed to delete dashboard");
      }
    } catch (error) {
      console.error("Error deleting dashboard:", error);
    }
  };

  // TODO: Change weather
  //   const [showWeatherSubmit, setShowWeatherSubmit] = useState(false);
  // TODO: Change stocks

  return (
    <div>
      <div
        className="title playfair dashboard-title-div"
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
              <p className="setting-title">Dashboard name:</p>
              <input
                type="text"
                id="db-name"
                className="input"
                name="db-name"
                value={changedDBName}
                placeholder={DBName}
                onChange={handleDBNameInput}
                onBlur={onSubmitDBName}
              ></input>
              {showDBNameSuccess && (
                <p className="success small-text">Title changed!</p>
              )}
              {showDBNameFailure && (
                <p className="failure small-text">Please add a title.</p>
              )}
            </div>
          </div>

          {/* STYLE */}
          <h3 className="subtitle playfair settings-section-title">Style</h3>
          <div className="db-style-settings">
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                className={`card ${theme.clear_bg} style-card ${
                  DBTheme === index && "border border-black"
                }`}
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
          <p className="montserrat settings-text">
            Add your zipcode to see the weather near you on this dashboard.
          </p>
          <div className="montserrat db-content-settings">
            {dashboard.weather ? (
              <div className="db-content-setting">
                <p className="setting-title">Zipcode:</p>
                <input
                  type="text"
                  id="db-name"
                  className="input"
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
          <p className="montserrat settings-text">
            Add up to three stocks on each dashboard.
          </p>
          <div className="montserrat db-content-settings">
            {dashboard.stocks.length > 0 && (
              <div className="db-content-setting">
                <p className="setting-title">Stocks:</p>
                {dashboard.stocks.map((stock, index) => (
                  <div key={20 + index}>
                    <input
                      type="text"
                      id="stock-name"
                      className="input"
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

          {/* TODOS AND LISTS */}
          <h3 className="subtitle playfair settings-section-title">
            Todos and Lists
          </h3>
          <p className="montserrat settings-text">
            Add up to three todo lists and three lists on each dashboard.
          </p>
          <div className="montserrat db-content-settings">
            {todos.length > 0 && (
              <div className="db-content-setting">
                <p className="setting-title">Todos:</p>
                <div className="list-titles">
                  {todos.map((todo, index) => (
                    <div key={30 + index}>
                      <TodoSettings
                        dashboardId={dashboard._id}
                        index={index}
                        todo={todo}
                        numTodos={dashboard.todos.length}
                        onDelete={handleDeleteTodo}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {todos.length < 3 && (
              <button
                className="settings-button"
                onClick={() => addNewTodoList()}
              >
                Add todo list
              </button>
            )}
            {lists.length === 0 && <div className="mb-2"></div>}
            {lists.length > 0 && (
              <div className="db-content-setting mt-6">
                <p className="setting-title">Lists:</p>
                <div className="list-titles ml-3">
                  {lists.map((list, index) => (
                    <div key={40 + index}>
                      <ListSettings
                        dashboardId={dashboard._id}
                        index={index}
                        list={list}
                        numLists={dashboard.lists.length}
                        onDelete={handleDeleteList}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {lists.length < 3 && (
              <button className="settings-button" onClick={() => addNewList()}>
                Add list
              </button>
            )}
          </div>

          {/* DELETE */}
          <h3 className="subtitle playfair settings-section-title">
            Danger Zone
          </h3>
          <div className="montserrat db-content-settings">
            <button
              className="delete-db-button"
              onClick={() => onDeleteDashboard()}
            >
              Delete {DBName} dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
