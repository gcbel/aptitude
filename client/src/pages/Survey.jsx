/* DEPENDENCIES */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useTheme } from "../utils/ThemeContext";
import "../styles/survey.css";

/* SURVEY PAGE */
export default function Survey() {
  const { theme, setTheme, themes } = useTheme();

  const [DBTheme, setDBTheme] = useState(7);
  const [question, setQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showNext, setShowNext] = useState(true);

  const switchQuestion = (change) => {
    setQuestion((prev) => prev + change);
    if (change < 0) {
      setShowNext(true);
    }
    if (change > 0) {
      setShowNext(false);
    }
  };

  return (
    <div className="montserrat" id="survey-page">
      {/* QUESTION TRACKER */}
      <div className="indicators">
        <div
          className={`indicator-circle ${
            question === 0 ? "bg-stone-400" : "bg-stone-300"
          }`}
        />
        <div
          className={`indicator-circle ${
            question === 1 ? "bg-stone-400" : "bg-stone-300"
          }`}
        />
        <div
          className={`indicator-circle ${
            question === 2 ? "bg-stone-400" : "bg-stone-300"
          }`}
        />
        <div
          className={`indicator-circle ${
            question === 3 ? "bg-stone-400" : "bg-stone-300"
          }`}
        />
        <div
          className={`indicator-circle ${
            question === 4 ? "bg-stone-400" : "bg-stone-300"
          }`}
        />
      </div>

      {/* INTRO */}
      {question === 0 && (
        <div className="survey-question">
          <h1 className="playfair title">
            Hi! Let's get to know a bit more about you.
          </h1>
          <p className="small-text">
            You'll be able to change your answers again later!
          </p>
        </div>
      )}

      {/* STYLE */}
      {question === 1 && (
        <div className="survey-question">
          <h1 className="playfair title">What's your style?</h1>
          <div className="db-style-settings">
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                className={`card ${theme.clear_bg} style-card ${
                  DBTheme === index && "border border-[#00000068]"
                }`}
                onClick={() => setDBTheme(index)}
              >
                <div className={`mini-card ${theme.dark}`}></div>
                <div className="right-style-cards">
                  <div className={`mini-card ${theme.medium}`}></div>
                  <div className={`mini-card ${theme.light}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DASHBOARD NAME */}
      {question === 2 && (
        <div className="survey-question">
          <h1 className="playfair title">
            What would you like to name your first dashboard?
          </h1>
          <p>
            You can create up to 8 dashboards, so you can organize your
            dashboards however you like!
          </p>
          <input></input>
        </div>
      )}

      {/* GOALS */}
      {question === 3 && (
        <div className="survey-question">
          <h1 className="playfair title">
            What goals do you want to see on this dashboard?
          </h1>
          <input></input>
        </div>
      )}

      {/* OTHER */}
      {question === 4 && (
        <div className="survey-question">
          <h1 className="playfair title">
            What else would you like to see on your dashboard?
          </h1>
          <p>You'll set these up later.</p>
          <button>Stocks</button>
          <button>Weather</button>
          <button>Todo Lists</button>
          <button>List</button>
          <button>Habit tracker</button>
        </div>
      )}

      {/* BUTTONS */}
      <div id="survey-navigate-buttons">
        {question > 0 && (
          <button onClick={() => switchQuestion(-1)}>Go back</button>
        )}
        {showNext && question < 4 && (
          <button onClick={() => switchQuestion(1)}>Next</button>
        )}
        {showNext && question == 4 && (
          <button onClick={() => switchQuestion(1)}>Create my dashboard</button>
        )}
      </div>
    </div>
  );
}
