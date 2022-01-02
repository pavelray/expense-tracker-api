const express = require("express");
const { json } = require("body-parser");

const expenseRoutes = require("./routes/expense.router");
const globalErrorController = require("./controller/error.controller");

const app = express();

//Middlewares
app.use(json());

// Routes
app.use("/api/v1/expense", expenseRoutes);

// Unhandled routes
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server.`, 404);
  next(err); // If we pass any value to next middleware then express takes that as an error
});

app.use(globalErrorController);

module.exports = app;
