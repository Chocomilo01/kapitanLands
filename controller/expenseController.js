const ExpenseService = require("../services/expenseService");

class ExpenseController {
  async createExpense(req, res) {
    try {
      const expense = await ExpenseService.create(req.body);
      res.status(201).json({
        success: true,
        message: "Expense created successfully",
        data: expense
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating expense",
        error: error.message
      });
    }
  }

  async getAllExpenses(req, res) {
    try {
      const expenses = await ExpenseService.findAll();
      res.status(200).json({
        success: true,
        message: "Expenses fetched successfully",
        data: expenses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching expenses",
        error: error.message
      });
    }
  }

  async getExpenseById(req, res) {
    try {
      const expense = await ExpenseService.findById(req.params.id);
      if (!expense) {
        return res.status(404).json({
          success: false,
          message: "Expense not found"
        });
      }
      res.status(200).json({
        success: true,
        data: expense
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching expense",
        error: error.message
      });
    }
  }

  async updateExpense(req, res) {
    try {
      const updatedExpense = await ExpenseService.update(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: updatedExpense
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating expense",
        error: error.message
      });
    }
  }

  async deleteExpense(req, res) {
    try {
      await ExpenseService.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Expense deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting expense",
        error: error.message
      });
    }
  }

  async getExpensesByDateRange(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const expenses = await ExpenseService.findByDateRange(startDate, endDate);
      res.status(200).json({
        success: true,
        message: "Expenses fetched by date range",
        data: expenses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching expenses by date",
        error: error.message
      });
    }
  }

  async getExpenseSummary(req, res) {
    try {
      const summary = await ExpenseService.getSummary();
      res.status(200).json({
        success: true,
        message: "Expense summary fetched",
        data: summary
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching expense summary",
        error: error.message
      });
    }
  }
}

module.exports = new ExpenseController();