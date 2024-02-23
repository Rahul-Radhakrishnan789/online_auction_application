const BidItems = require("../models/bidItemModel");


//display bidItems

const displayBids = async (req, res) => {
  const bids = await BidItems.find();

  if (!bids || bids.length === 0) {
    return res.status(404).json({ error: "No bids found." });
  }

  res.status(200).json({
    status: "success",
    data: bids,
  });
};


module.exports = {
  displayBids,
};
