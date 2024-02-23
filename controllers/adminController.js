const BidItems = require("../models/bidModel");

const Bid = require("../models/biddingModel");

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

//find the highest bidder and highest bid amount

const findHighestBidderAndAmount = async (req, res) => {

    const {item} = req.params.id;

  const bids = await Bid.findById({item}).populate().exec();

  if (bids.length === 0) {
        return res.status(404).json({
            status: "failure",
            message: "no bids found",
          });

  }

  bids.sort((a, b) => b.amount - a.amount);

  const highestBid = bids[0];
  const highestBidder = highestBid.userId;
  const highestBidAmount = highestBid.amount;

   bids.highestBidder.push(highestBidder)
   bids.highestBidAmount.push(highestBidAmount)

   res.status(200).json({
    status: "success",
    data: highestBidAmount,highestBidder,
  });
};

module.exports = {
  displayBids,
};
