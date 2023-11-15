const express = require("express");

const {
  getAll,
  deleteGoal,
  updateGoal,
  createGoal,
  setGoalUserId,
} = require("../controllers/goalControllers");
const { protect } = require("../controllers/authController");

const goalRouter = express.Router();

// goalRouter.use(protect);

// goalRouter.route("/").get(getAll).post(setGoalUserId, createGoal);
goalRouter.route("/").get(getAll).post(createGoal);
goalRouter.route("/:id").delete(deleteGoal).patch(updateGoal);

module.exports = goalRouter;
