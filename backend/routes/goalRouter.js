const express = require("express");

const {
  getAll,
  deleteGoal,
  updateGoal,
  createGoal,
  setTourUserIds,
} = require("../controllers/goalControllers");
const { protect } = require("../controllers/authController");

const goalRouter = express.Router();

goalRouter.use(protect);

goalRouter.route("/").get(getAll).post(setTourUserIds, createGoal);
goalRouter.route("/:id").delete(deleteGoal).patch(updateGoal);

module.exports = goalRouter;
