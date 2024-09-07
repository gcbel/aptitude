/* LISTS */
export default function Lists({ lists, themeArray }) {
  console.log(lists);
  return (
    <div>
      {lists.map((list, index) => (
        <div className={`${themeArray.light} card`} key={index}>
          <h4>{list.name}</h4>
          {list.items.map((item, index) => (
            <div
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
