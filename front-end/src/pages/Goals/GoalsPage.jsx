// GoalsPage.js
import React, { useEffect, useState } from "react";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";
import styles from "./GoalsPage.module.css";
import GoalsSummary from "./GoalsSummary";
import getUserToken from "../../util/getUserToken";

const fetchData = async (setGoals, setError) => {
  try {
    const token = getUserToken();
    // console.log(token);

    const response = await fetch("http://localhost:7000/api/v1/goals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result.status === "success") setGoals(result.goals);
    else {
      throw new Error();
    }
  } catch (error) {
    setError("Error fetching data, Please try again later", error);
  }
};

const addGoal = async (setGoals, setError, newGoal) => {
  const token = getUserToken();

  try {
    const res = await fetch("http://localhost:7000/api/v1/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newGoal),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    // console.log(data);
    if (data.status === "success") {
      console.log(data.goal);
      setGoals((prevGoals) => {
        return [data.goal, ...prevGoals];
      });
    } else {
      throw new Error(": Unable to add Goals");
    }
  } catch (error) {
    setError("An unexpected Error occured ", error);
  }
};

const markAsDoneFun = async (setGoals, setError, goalId, currentState) => {
  try {
    const token = getUserToken();

    const res = await fetch(`http://localhost:7000/api/v1/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ markedAsDone: !currentState }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();

    if (data.status === "success") {
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, markedAsDone: !currentState } : goal
        )
      );
    } else {
      throw new Error(": Unable to update Goal");
    }
  } catch (err) {
    setError("An unexpected Error occured ", err);
  }
};

const deleteGoal = async (setGoals, setError, goalId) => {
  const token = getUserToken();

  try {
    const res = await fetch(`http://localhost:7000/api/v1/goals/${goalId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("ONe");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    if (res.status === 204) {
      console.log("ONeew");
      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
      console.log("two");
    } else {
      throw new Error(": Unable to delete the Goal");
    }
  } catch (error) {
    setError("An unexpected Error occured ", error);
  }
};

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData(setGoals, setError);
  }, []);

  const addbuttonHandler = (text) => {
    const newGoal = { goal: text, read: false };
    addGoal(setGoals, setError, newGoal);
  };

  const marksAsDoneBtnHandler = (goalId, currentState) => {
    markAsDoneFun(setGoals, setError, goalId, currentState);
  };

  const deleteGoalBtnHandler = (id) => {
    deleteGoal(setGoals, setError, id);
  };

  if (error) {
    return (
      <div className={styles.goalsPage}>
        <h1 className={styles.goalHeader}>Goals</h1>
        <GoalsSummary>{error}</GoalsSummary>
      </div>
    );
  }

  return (
    <div className={styles.goalsPage}>
      <h1 className={styles.goalHeader}>Goals</h1>
      <GoalForm addGoal={addbuttonHandler} />
      {goals.length ? (
        <GoalsSummary goals={goals} />
      ) : (
        <GoalsSummary>Add Your Goals in the form</GoalsSummary>
      )}

      {!goals.length || (
        <GoalList
          goals={goals}
          markAsDoneFun={marksAsDoneBtnHandler}
          deleteGoal={deleteGoalBtnHandler}
        />
      )}
    </div>
  );
};

export default GoalsPage;
