const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BidItems',
    // required: true,
  },
  amount: {
    type: Number,
    // required: true,
  },
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
