/* DEPENDENCIES */
import { useState } from "react";

/* TODOS */
export default function Todos({ todos, themeArray }) {
  const [todoList, setTodoList] = useState(todos);

  // Handle toggle completed state
  const toggleCompleted = (todoIndex, itemIndex) => {
    const updatedTodos = [...todoList];
    updatedTodos[todoIndex].items[itemIndex].completed =
      !updatedTodos[todoIndex].items[itemIndex].completed;
    setTodoList(updatedTodos);
  };

  // Add new todo item
  const addTodo = (todoIndex, newItemName) => {
    const updatedTodos = [...todoList];
    updatedTodos[todoIndex].items.push({ name: newItemName, completed: false });
    setTodoList(updatedTodos);
  };

  // Remove todo item
  const removeTodo = (todoIndex, itemIndex) => {
    const updatedTodos = [...todoList];
    updatedTodos[todoIndex].items.splice(itemIndex, 1);
    setTodoList(updatedTodos);
  };

  return (
    <div className="todo-or-list">
      {todoList.map((todo, todoIndex) => (
        <div className={`${themeArray.light} card`} key={todoIndex}>
          <h4>{todo.title}</h4>
          {todo.items.map((item, itemIndex) => (
            <div key={itemIndex}>
              <div className={`${themeArray.outer_text} clear-mini-card`}>
                <i
                  className={`fa-regular ${
                    item.completed ? "fa-square-check" : "fa-square"
                  }`}
                  onClick={() => toggleCompleted(todoIndex, itemIndex)}
                ></i>
                <p>{item.name}</p>
                <button onClick={() => removeTodo(todoIndex, itemIndex)}>
                  Remove
                </button>
              </div>
              {itemIndex < todo.items.length - 1 && (
                <div className="separator"></div>
              )}
            </div>
          ))}
          <button
            onClick={() =>
              addTodo(todoIndex, prompt("Enter the name of the new item"))
            }
          >
            Add Todo
          </button>
        </div>
      ))}
    </div>
  );
}
