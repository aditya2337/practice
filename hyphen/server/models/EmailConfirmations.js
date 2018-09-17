const mongoose = require('mongoose');
const { Schema } = mongoose;

const confirmationSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true,
  },
});

const EmailConfirmations = mongoose.model('confirmations', confirmationSchema);

module.exports = EmailConfirmations;

