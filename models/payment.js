const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    transaction_Id: {
      type: String,
      require: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymantModel = mongoose.model('Payment', paymentSchema);
module.exports = PaymantModel;
