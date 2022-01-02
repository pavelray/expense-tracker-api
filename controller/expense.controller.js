const AppError = require("../models/appError");
const Expense = require("../models/expense");
const { catchAsync } = require("../utils/utils");

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expense = await Expense.findAll();
    res.status(200).json({
      status: "success",
      data: {
        expense: expense,
      },
    });
  } catch (ex) {
    throw next(new Error("Error Occoured while getting all data"));
  }
};

exports.getExpense = async (req, res, next) => {
  const id = req.params.id;
  const expense = await Expense.findOne(id);
  if (!expense) {
    return next(new AppError("No Expence found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      expense: expense,
    },
  });
};

exports.createNewExpense = catchAsync(async (req, res, next) => {
  const { category, amount, date, description } = req.body;
  const expense = await new Expense(category, amount, date, description).save();

  res.status(201).json({
    status: "success",
    data: {
      expense: expense,
    },
  });
});

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
