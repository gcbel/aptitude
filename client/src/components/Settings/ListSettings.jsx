/* DEPENDENCIES */
import { CHANGE_LIST_NAME, ADD_LIST, DELETE_LIST } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";

/* LIST SETTINGS */
export default function ListSettings({
  dashboardId,
  index,
  list,
  numLists,
  onDelete,
}) {
  // Mutations
  const [changeListName] = useMutation(CHANGE_LIST_NAME);
  const [addList] = useMutation(ADD_LIST);
  const [deleteList] = useMutation(DELETE_LIST);

  // Track changing states
  const [listName, setListName] = useState(list.name);
  const [changedListName, setChangedListName] = useState(list.name);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  // Handle changing list name
  const handleInput = (event) => {
    const newName = event.target.value;
    setShowSuccess(false);
    setChangedListName(newName);
  };

  const onSubmitListName = async () => {
    // Prevent user from changing to an empty list name
    if (changedListName === "") {
      setShowSuccess(false);
      setShowFailure(true);
      // Change list name if non-empty changed name
    } else if (changedListName === listName) {
      setShowSuccess(false);
      setShowFailure(false);
    } else {
      try {
        setListName(changedListName);
        if (index + 1 > numLists) {
          const { data } = await addList({
            variables: {
              id: dashboardId,
              name: changedListName,
            },
          });
          setShowFailure(false);
          setShowSuccess(true);
          setSuccessMessage("List added!");
        } else {
          const { data } = await changeListName({
            variables: {
              id: dashboardId,
              index: index,
              name: changedListName,
            },
          });
          setSuccessMessage("Title changed!");
        }
        setShowSuccess(true);
      } catch (error) {
        console.error("Error adding/changing list:", error);
      }
    }
  };

  // Handle deleting list
  const onDeleteList = async () => {
    try {
      onDelete(index);
      const { data } = await deleteList({
        variables: {
          id: dashboardId,
          index: index,
        },
      });
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  return (
    <div className="db-content-setting">
      <input
        type="text"
        id="list-name"
        className="input"
        name="list-name"
        value={changedListName}
        placeholder={listName}
        onChange={handleInput}
        onBlur={onSubmitListName}
      ></input>
      <button className="delete-button" onClick={() => onDeleteList()}>
        X
      </button>
      {showSuccess && <p className="success small-text">{successMessage}</p>}
      {showFailure && <p className="failure small-text">Please add a title.</p>}
    </div>
  );
}
