// GoalList.jsx

import React from "react";

const GoalList = ({ goals }) => {
  return (
    <ul>
      {goals.map((goal, index) => (
        <li key={index}>{goal}</li>
      ))}
    </ul>
  );
};

export default GoalList;
