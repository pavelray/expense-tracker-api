const express = require('express');
const expenseController = require('../controller/expense.controller');

const router = express.Router();

router
    .route('/')
    .get(expenseController.getAllExpenses)
    .post(expenseController.createNewExpense);

router
    .route('/:id')
    .get(expenseController.getExpense)
    .put(expenseController.updateExpense)
    .delete(expenseController.deleteExpense);

module.exports = router;