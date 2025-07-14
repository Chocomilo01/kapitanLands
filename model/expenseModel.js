const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    expenseHead: { type: String, required: true },
    transactionType: { 
      type: String, 
      enum: ["debit", "credit"], 
      required: true 
    },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    description: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now },
    uploadedBy: { type: String, required: true },
    collectedBy: { type: String },
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);