/* DEPENDENCIES */

/* GOALS */
export default function Goals({ goals, themeArray }) {
  const array = goals.goals;

  return (
    <div className={`${themeArray.medium} card`}>
      <h4>Goals</h4>
      <div className={`${themeArray.outer_text} goals`}>
        {array?.map((goal, index) => (
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
