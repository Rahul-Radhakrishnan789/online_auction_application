const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const BidItems = require("./models/bidItemModel");
const morgan = require("morgan");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.URL)
  .then(() => console.log("mongodb connected"))
  .catch((e) => console.log("error found", e));

const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use(adminRoutes);



//find the highest bidder and highest bid amount

const findHighestBidderAndAmount = async () => {
  const bids = await BidItems.find({}).populate("bidders").exec();

  const getRemainingTime = (startTime, auctionDuration) => {
    const currentTime = new Date();
    const endTime = new Date(startTime + auctionDuration * 60000); 
    return Math.max(0, endTime - currentTime); 
  };
  const remainingTime = getRemainingTime(bids.startTime, bids.auctionDuration);

  if (bids.length > 0 && remainingTime !== 0) {
    bids.sort((a, b) => b.amount - a.amount);

    const highestBid = bids[0];
    const highestBidder = highestBid.userId;
    const highestBidAmount = highestBid.amount;


    const highestBidInfo =  BidItems({
        highestBidder,
        highestBidAmount,
      });

      await highestBidInfo.save();



  }

};

setInterval(findHighestBidderAndAmount, 10000000);  // checks every time for an updation

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
