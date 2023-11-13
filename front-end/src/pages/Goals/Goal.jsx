import React, { useState } from "react";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";
import styles from "./Goals.module.css"; // Import the CSS module

const Goals = () => {
  const [goals, setGoals] = useState([]);

  const addGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  return (
    <div className={styles.goalsContainer}>
      {" "}
      {/* Use the styles from the module */}
      <h1 className={styles.goalsHeader}>Goal Tracker</h1>
      <GoalForm addGoal={addGoal} />
      <GoalList goals={goals} />
    </div>
  );
};

export default Goals;
