const ExpenseModel = require("../schemas/expense");

module.exports = class Expense {
  constructor(c, a, d, desc) {
    this.category = c;
    this.amount = a;
    this.date = d;
    this.description = desc;
  }

  async save() {
    try {
      const newProduct = await ExpenseModel.create(this);
      return newProduct;
    } catch (ex) {
      throw ex;
    }
  }

  async update(id) {
    const newExpense = await ExpenseModel.findByIdAndUpdate(id, this, {
      new: true,
      runValidators: true,
    });
    if (!newExpense) {
      return new Error("Expense not found");
    }
    return newExpense;
  }

  static async findOne(id) {
    const expense = await ExpenseModel.findById(id);
    if (!expense) {
      return new Error("Expense not found");
    }
    return expense;
  }

  static async findAll() {
    const expenses = await ExpenseModel.find({});
    if (!expenses) {
      return new Error("Expenses not found");
    }
    return expenses;
  }

  static async delete(id) {
    try {
      const expense = await ExpenseModel.findByIdAndDelete(id);
      return expense;
    } catch (ex) {
      throw ex;
    }
  }
};
