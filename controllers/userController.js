const User = require("../models/userModel");
const BidItems = require('../models/bidModel')
const Bid = require("../models/biddingModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//user registration

const userRegister = async (req, res) => {
  const { password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    password: hashedPassword,
    email: email,
  });

  await user.save();

  res.status(200).json({
    status: "success",
    message: "user account registered succesfully",
  });
};

// user login

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({ error: "Invalid email " });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ userName: user.userName }, "rahul"); //{expiresIn:500}//seconds

  res.json({
    status: "success",
    message: "Login successful",
    data: {
      token: token,
      userId: user._id,
    },
  });
};


//placing a bid

const placeBid = async (req, res) => {
  const {  amount } = req.body;
  const userId = req.params.userId;
  const itemId = req.params.itemId

 

  const itemData = await BidItems.findById(itemId).populate().exec();

 
  if (!itemData) {
    return res.status(404).json({
      status: "failure",
      message: "Item not found",
    });
  }
  if(amount < itemData.basePrice){
    return res.status(404).json({
        status: "failure",
        message: "amount should never get less than baseprice",
      });
  }  

  const getRemainingTime = (startTime, auctionDuration) => {
    const currentTime = new Date();
    const endTime = new Date(startTime.getTime() + auctionDuration * 60000); 
    return Math.max(0, endTime - currentTime); 
  };
  const remainingTime = getRemainingTime(itemData.startTime, itemData.auctionDuration);
  if (remainingTime !== 0) {
  const newBid = new Bid({
    userId,
    amount,
  });

  await newBid.save();

  res.status(201).json({
    status: "success",
    message: "bidding succesful",
    data: newBid,
  });
}
};

//list items for auction

const addForAuction = async (req, res) => {
    
  const { itemName, basePrice, auctionDuration, images } = req.body;
 
  const userId = req.params.userId;

  const newItem = new BidItems({
    userId,
    itemName,
    basePrice,
    auctionDuration,
    images,
  });
  await newItem.save();

  res.status(201).json({ message: "Item listed for auction successfully" });
};



module.exports = {
  userRegister,
  userLogin,
  placeBid,
  addForAuction
};
