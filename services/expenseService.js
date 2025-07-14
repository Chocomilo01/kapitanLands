const Expense = require("../model/expenseModel");

class ExpenseService {
  static async create(expenseData) {
    const expense = new Expense(expenseData);
    return await expense.save();
  }

  static async findAll() {
    return await Expense.find().sort({ createdAt: -1 });
  }

  static async findById(id) {
    return await Expense.findById(id);
  }

  static async update(id, updateData) {
    return await Expense.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async delete(id) {
    return await Expense.findByIdAndDelete(id);
  }

  static async findByDateRange(startDate, endDate) {
    return await Expense.find({
      paymentDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });
  }

  static async getSummary() {
    const [totalDebits, totalCredits] = await Promise.all([
      Expense.aggregate([
        { $match: { transactionType: "debit" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Expense.aggregate([
        { $match: { transactionType: "credit" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ])
    ]);

    return {
      totalDebits: totalDebits[0]?.total || 0,
      totalCredits: totalCredits[0]?.total || 0,
      balance: (totalCredits[0]?.total || 0) - (totalDebits[0]?.total || 0)
    };
  }
}

module.exports = ExpenseService;