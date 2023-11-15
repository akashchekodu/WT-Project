const Goal = require("../models/goalsModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");

const setGoalUserId = (req, res, next) => {
  if (req.user.id) {
    req.body.user = req.user.id;
  }
  next();
};

const getAll = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.user) {
    filter = { user: req.params.user };
  }
  const features = new APIFeatures(Goal.find(), req.query).sort().limitFields();

  const goals = await features.query;

  res.status(200).json({
    status: "success",
    goals,
  });
});

const deleteGoal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid ObjectId", 400));
  }

  const goal = await Goal.findByIdAndDelete(id);

  if (!goal) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const updateGoal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid ObjectId", 400));
  }

  const goal = await Goal.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!goal) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    goal,
  });
});

const createGoal = catchAsync(async (req, res, next) => {
  const goal = await Goal.create(req.body);
  res.status(201).json({
    status: "success",
    goal,
  });
});

module.exports = { getAll, deleteGoal, updateGoal, setGoalUserId, createGoal };
