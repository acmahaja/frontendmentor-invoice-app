const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["draft", "pending", "paid"],
    default: "draft",
  },
});

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;
