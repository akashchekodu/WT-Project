const express = require("express");
const { userRouter } = require("./routes/userRouter");

const app = express();
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1", userRouter);

module.exports = app;
