const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const https = require("https");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("Connected to DB"));

const port = process.env.PORT || 7000;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
