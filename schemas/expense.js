const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: {
        values: [
          "Utility",
          "Food",
          "Shopping",
          "Savings",
          "Rent",
          "EMI",
          "Entertenment",
          "Emergency",
          "Travel",
          "Household",
        ],
        message:
          "Expense Category must be either any of these Utility,Food,Shopping,Savings,Rent,EMI,Entertenment, Emergency, Travel, Household",
      },
    },
    amount: {
      type: Number,
      required: [true, "Expense Amount is required"],
    },
    description: {
      type: String,
      min: 20,
      max: 80,
    },
    date: {
      type: String,
      required: [true, "An Expense date is required"],
    },
    userId: {
      type: String,
      required: [true, "User Id is required."],
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
