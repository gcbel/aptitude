/* TODOS */
export default function Todos({ todos, themeArray }) {
  console.log(todos);
  return (
    <div>
      {todos.map((todo, index) => (
        <div className={`${themeArray.light} card`} key={index}>
          <h4>{todo.title}</h4>
          {todo.items.map((item, index) => (
            <div>
              <div className={`${themeArray.outer_text} clear-mini-card`}>
                <p>{item.name}</p>
              </div>
              {index + 1 != todo.items.length && (
                <div className="seperator"></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
