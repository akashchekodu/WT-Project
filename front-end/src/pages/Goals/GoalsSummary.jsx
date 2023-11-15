import React from "react";
import styles from "./GoalsSummary.module.css";

const GoalsSummary = (props) => {
  if (!props.goal) {
    return (
      <div className={styles.summaryContainer}>
        <h3>{props.children}</h3>
      </div>
    );
  }

  const pending = props.goals.reduce((accumulator, goal) => {
    return accumulator + (goal.read === false ? 1 : 0);
  }, 0);

  return (
    <div className={styles.summaryContainer}>
      <h3>Goals Summary</h3>
      <p>Pending: {pending}</p>
      <p>Completed: {props.goals.length - pending}</p>
    </div>
  );
};

export default GoalsSummary;
