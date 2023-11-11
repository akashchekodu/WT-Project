const express = require("express");
const { userRouter } = require("./routes/userRouter");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const goalRouter = require("./routes/goalRouter");

const app = express();
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1", userRouter);

app.use("/api/v1/goals", goalRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler); //Will get executed at the end
module.exports = app;
