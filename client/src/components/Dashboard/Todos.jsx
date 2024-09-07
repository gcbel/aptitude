/* TODOS */
export default function Todos({ todos, themeArray }) {
  return (
    <div className="todo-or-list">
      {todos.map((todo, index) => (
        <div className={`${themeArray.light} card`} key={index}>
          <h4>{todo.title}</h4>
          {todo.items.map((item, index) => (
            <div key={index}>
              <div className={`${themeArray.outer_text} clear-mini-card`}>
                <i className="fa-regular fa-square-check"></i>
                <p>{item.name}</p>
              </div>
              {index < todo.items.length - 1 && (
                <div className="separator"></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
