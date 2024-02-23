const mongoose = require('mongoose')


const biddingitemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    itemName:{
        type:String,
        required:true
      
    },
    basePrice:{
        type:Number,
        required:true
    },
    images:{
        type:Array
    },
    auctionDuration:{
        type:Date
    },
    bidders:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'Bid'
    },
    highestBidder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    highestBidAmount:{
        type:Number
    }, 
    startTime: { 
        type: Date,
        default: Date.now 
    },
})



const BidItems = mongoose.model("BidItems", biddingitemSchema)

module.exports = BidItems;