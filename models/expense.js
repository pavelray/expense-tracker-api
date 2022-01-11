const ExpenseModel = require("../schemas/expense");

module.exports = class Expense {
  constructor(c, a, d, desc, userId) {
    this.category = c;
    this.amount = a;
    this.date = d;
    this.description = desc;
    this.userId = userId.toString();
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
    return newExpense;
  }

  static async findOne(id) {
    const expense = await ExpenseModel.findById(id);
    return expense;
  }

  static async findAll(userId) {
    const expenses = await ExpenseModel.find({userId: userId.toString()}).exec();
    return expenses;
  }

  static async delete(id) {
    const expense = await ExpenseModel.findByIdAndDelete(id);
    return expense;
  }
};
