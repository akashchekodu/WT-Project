// GoalForm.jsx

import React, { useState } from "react";
import styles from "./GoalForm.module.css"; // Import the CSS module

const GoalForm = ({ addGoal }) => {
  const [newGoal, setNewGoal] = useState("");

  const handleInputChange = (e) => {
    setNewGoal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.trim() === "") {
      // You can add some validation logic here
      return;
    }
    addGoal(newGoal);
    setNewGoal("");
  };

  return (
    <form className={styles.goalForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your goal..."
        value={newGoal}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add Goal
      </button>
    </form>
  );
};

export default GoalForm;
