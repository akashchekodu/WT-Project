// GoalList.js
import React from "react";
import Goal from "./Goal";
import styles from "./GoalList.module.css";

const GoalList = ({ goals, markAsDoneFun, deleteGoal }) => {
  return (
    <div className={styles.goalList}>
      <h3>Your Goals:</h3>
      {goals.map((goal) => (
        <Goal
          id={goal._id}
          key={goal._id}
          goal={goal.goal}
          markAsDone={goal.markedAsDone}
          markAsRead={markAsDoneFun}
          deleteGoal={deleteGoal}
        />
      ))}
    </div>
  );
};

export default GoalList;
