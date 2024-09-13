/* DEPENDENCIES */
import {
  CHANGE_TODO_NAME,
  ADD_TODO_LIST,
  DELETE_TODO_LIST,
} from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";

/* TODO SETTINGS */
export default function TodoSettings({
  dashboardId,
  index,
  todo,
  numTodos,
  onDelete,
}) {
  // Mutations
  const [changeTodoName] = useMutation(CHANGE_TODO_NAME);
  const [addTodoList] = useMutation(ADD_TODO_LIST);
  const [deleteTodoList] = useMutation(DELETE_TODO_LIST);

  // Track changing states
  const [todoName, setTodoName] = useState(todo.title);
  const [changedTodoName, setChangedTodoName] = useState(todo.title);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  // Handle changing todo name
  const handleTodoInput = (event) => {
    const newName = event.target.value;
    setShowSuccess(false);
    setChangedTodoName(newName);
  };

  const onSubmitTodoName = async () => {
    // Prevent user from changing to an empty todo list name
    if (changedTodoName === "") {
      setShowSuccess(false);
      setShowFailure(true);
      // Change todo list name if non-empty changed name
    } else if (changedTodoName === todoName) {
      setShowSuccess(false);
      setShowFailure(false);
    } else {
      try {
        setTodoName(changedTodoName);
        if (index + 1 > numTodos) {
          const { data } = await addTodoList({
            variables: {
              id: dashboardId,
              name: changedTodoName,
            },
          });
          setShowFailure(false);
          setShowSuccess(true);
          setSuccessMessage("Todo list added!");
        } else {
          const { data } = await changeTodoName({
            variables: {
              id: dashboardId,
              index: index,
              name: changedTodoName,
            },
          });
          setSuccessMessage("Title changed!");
        }
        setShowSuccess(true);
      } catch (error) {
        console.error("Error adding/changing todo:", error);
      }
    }
  };

  // Handle deleting todo
  const onDeleteTodoList = async () => {
    try {
      onDelete(index);
      const { data } = await deleteTodoList({
        variables: {
          id: dashboardId,
          index: index,
        },
      });
    } catch (error) {
      console.error("Error deleting todo list:", error);
    }
  };

  return (
    <div className="db-content-setting">
      <div className="input-and-delete">
        <input
          type="text"
          id="todo-name"
          name="todo-name"
          value={changedTodoName}
          placeholder={todoName}
          onChange={handleTodoInput}
          onBlur={onSubmitTodoName}
        ></input>
        <button className="delete-button" onClick={() => onDeleteTodoList()}>
          X
        </button>
      </div>
      {showSuccess && <p className="success small-text">{successMessage}</p>}
      {showFailure && <p className="failure small-text">Please add a title.</p>}
    </div>
  );
}
