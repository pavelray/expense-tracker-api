const express = require("express");
const { json } = require("body-parser");
const {graphqlHTTP} = require('express-graphql');

const expenseRoutes = require("./routes/expense.router");
const userRouters = require('./routes/user.router');
const globalErrorController = require("./controller/error.controller");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require('./graphql/resolvers');

const app = express();

//Middlewares
app.use(json());

// Routes
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/user", userRouters);
app.use("/api/v1/graphql",graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true
}))

// Unhandled routes
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server.`, 404);
  next(err); // If we pass any value to next middleware then express takes that as an error
});

app.use(globalErrorController);

module.exports = app;
