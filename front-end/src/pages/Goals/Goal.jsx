// Goal.js
import React from "react";
import styles from "./Goal.module.css";

const Goal = ({ markAsDone, id, goal, markAsRead, deleteGoal }) => {
  if (!goal) {
    return null;
  }
  // console.log(markAsDone);

  return (
    <div className={`${styles.goal} ${markAsDone ? styles.read : ""}`}>
      <span className={styles.markAsRead}>
        {" "}
        <p>{goal}</p>
      </span>
      <div className={styles.icons}>
        <span onClick={() => markAsRead(id, markAsDone)}>&#10003;</span>
        <span className={styles.delete} onClick={() => deleteGoal(id)}>
          &#10007;
        </span>
      </div>
    </div>
  );
};

export default Goal;
