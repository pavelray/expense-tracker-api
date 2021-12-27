const express = require('express');

const expenseRoutes = require('./routes/expense.router');

const app = express();

app.use('/api/v1', expenseRoutes);

// Unhandled routes
app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server.`, 404);
    next(err); // If we pass any value to next middleware then express takes that as an error
});
  
module.exports = app;