// GoalForm.js
import React, { useState } from "react";
import styles from "./GoalForm.module.css";

const GoalForm = ({ addGoal }) => {
  const [goal, setGoal] = useState("");

  const handleInputChange = (e) => {
    setGoal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goal.trim() !== "") {
      addGoal(goal);
      setGoal("");
    }
  };

  return (
    <div className={styles.goalForm}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter your goal"
          value={goal}
          onChange={handleInputChange}
        />
        <button className={styles.button} type="submit">
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default GoalForm;
