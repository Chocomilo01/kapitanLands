const Joi = require("joi");

const expenseSchema = Joi.object({
  expenseHead: Joi.string().min(3).max(100).required(),
  transactionType: Joi.string().valid('debit', 'credit').required(),
  amount: Joi.number().positive().required(),
  quantity: Joi.number().positive().required(),
  rate: Joi.number().positive().required(),
  description: Joi.string().min(3).max(500).required(),
  paymentDate: Joi.date().iso(),
  uploadedBy: Joi.string().required(),
  collectedBy: Joi.string()
});

module.exports = expenseSchema;