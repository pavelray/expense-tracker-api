const express = require('express');
const expenseController = require('../controller/expense.controller');
const authController = require('../controller/auth.controller');

const router = express.Router();

router
    .route('/')
    .get(authController.protectedRoute, expenseController.getAllExpenses)
    .post(authController.protectedRoute, expenseController.createNewExpense);

router
    .route('/:id')
    .get(authController.protectedRoute, expenseController.getExpense)
    .put(authController.protectedRoute, expenseController.updateExpense)
    .delete(authController.protectedRoute, expenseController.deleteExpense);

module.exports = router;