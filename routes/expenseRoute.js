const express = require('express');
const router = express.Router();

const { authenticate, adminAuthorizer } = require('../middlewares/authentication');
const validate = require('../middlewares/validate.middleware');
const expenseSchema = require('../schema/expense.schema');
const expenseController = require('../controller/expenseController');

// Create expense (Admin/Manager only)
router.post('/', 
  authenticate, 
  adminAuthorizer, 
  validate(expenseSchema), 
  expenseController.createExpense
);

// Get all expenses (Admin only)
router.get('/', 
  authenticate, 
  adminAuthorizer, 
  expenseController.getAllExpenses
);

// Get expense by ID
router.get('/:id', 
  authenticate, 
  expenseController.getExpenseById
);

// Update expense (Admin only)
router.patch('/:id', 
  authenticate, 
  adminAuthorizer, 
  expenseController.updateExpense
);

// Delete expense (Admin only)
router.delete('/:id', 
  authenticate, 
  adminAuthorizer, 
  expenseController.deleteExpense
);

// Get expenses by date range
router.get('/report/date-range', 
  authenticate, 
  expenseController.getExpensesByDateRange
);

// Get expense summary
router.get('/report/summary', 
  authenticate, 
  expenseController.getExpenseSummary
);

module.exports = router;