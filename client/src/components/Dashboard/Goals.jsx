/* GOALS */
export default function Goals({ goals, themeArray }) {
  return (
    <div className={`${themeArray.medium} card`}>
      <h4>Goals</h4>
      <div className={`${themeArray.outer_text} goals`}>
        {goals?.map((goal, index) => (
          <div
            key={index}
            className={`${themeArray.clear_bg} mini-card goal-card`}
          >
            {goal.title}
          </div>
        ))}
      </div>
    </div>
  );
}
