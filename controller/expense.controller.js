const Expense = require("../models/expense");

exports.getAllExpenses = async (req, res, next) => {
  const expense = await Expense.findAll();
  res.status(200).json({
    status: "success",
    data: {
      expense: expense,
    },
  });
};

exports.getExpense = async (req, res, next) => {
  const id = req.params.id;
  const expense = await Expense.findOne(id);
  res.status(200).json({
    status: "success",
    data: {
      expense: expense,
    },
  });
};

exports.createNewExpense = async (req, res, next) => {
  const { category, amount, date, description } = req.body;
  const expense = await new Expense(category, amount, date, description).save();

  res.status(201).json({
    status: "success",
    data: {
      expense: expense,
    },
  });
};

exports.updateExpense = async (req, res, next) => {
  const id = req.params.id;
  const { category, amount, date, description } = req.body;
  const expense = await new Expense(category, amount, date, description).update(
    id
  );

  res.status(200).json({
    status: "success",
    data: {
      expense: expense,
    },
  });
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  const doc = await Expense.delete(id);
  if (!doc) {
    return next(new Error("No document found"));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
