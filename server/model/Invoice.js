const { Schema, model } = require("mongoose");
const countryList = require("../utils/countryList") ;

const invoiceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  street: {
    type: String,
    required:true 
  },
  city: {
    type: String,
    required: true 
  },
  postcode:{
    type: String,
    required: true
  },
  country: {
    type:String,
    enum: countryList,
    required: true
  },
  status: {
    type: String,
    enum: ["draft", "pending", "paid"],
    default: "draft",
  },
});

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;
