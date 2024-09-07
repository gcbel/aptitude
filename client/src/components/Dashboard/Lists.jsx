/* LISTS */
export default function Lists({ lists, themeArray }) {
  return (
    <div className="flex-1">
      {lists.map((list, index) => (
        <div key={index} className={`${themeArray.light} card`}>
          <h4>{list.name}</h4>
          {list.items.map((item, index) => (
            <div
              key={index}
              className={`${themeArray.clear_bg} ${themeArray.outer_text} mini-card`}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
