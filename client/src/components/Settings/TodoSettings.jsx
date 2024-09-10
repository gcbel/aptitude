/* DEPENDENCIES */
import { CHANGE_TODO_NAME } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";

/* TODO SETTINGS */
export default function TodoSettings({ dashboardId, index, todo }) {
  const [changeTodoName] = useMutation(CHANGE_TODO_NAME);

  const [todoName, setTodoName] = useState(todo.title);
  const [changedTodoName, setChangedTodoName] = useState(todo.title);
  const [showTodoSubmit, setShowTodoSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle changing todo name
  const handleTodoInput = (event) => {
    const newName = event.target.value;
    setShowSuccess(false);
    setChangedTodoName(newName);
    if (event.target.value.trim() !== "") {
      setShowTodoSubmit(true);
    }
  };

  const onSubmitTodoName = async () => {
    try {
      setShowTodoSubmit(false);
      setTodoName(changedTodoName);
      const { data } = await changeTodoName({
        variables: {
          id: dashboardId,
          index: index,
          name: changedTodoName,
        },
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Error changing Todo name:", error);
    }
  };

  return (
    <div className="db-content-setting">
      <input
        type="text"
        id="todo-name"
        name="todo-name"
        value={changedTodoName}
        placeholder={todoName}
        onChange={handleTodoInput}
      ></input>
      {showTodoSubmit && (
        <button onClick={() => onSubmitTodoName()} className="settings-button">
          Save
        </button>
      )}
      {showSuccess && (
        <p className="xs:mb-[0.7rem] small-text italic text-neutral-700">
          Successfully changed!
        </p>
      )}
    </div>
  );
}
