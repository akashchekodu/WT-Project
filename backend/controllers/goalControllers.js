const Goal = require("../models/goalsModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const setTourUserIds = (req, res, next) => {
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
  const features = new APIFeatures(Goal.find(), req.query).sort();

  const goals = await features.query;

  res.status(200).json({
    status: "success",
    goals,
  });
});

const deleteGoal = catchAsync(async (req, res, next) => {
  const goal = await Goal.findByIdAndDelete(req.params.id);

  if (!goal) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const updateGoal = catchAsync(async (req, res, next) => {
  const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
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

module.exports = { getAll, deleteGoal, updateGoal, setTourUserIds, createGoal };
