const express = require("express");

const router = express.Router();

const tryCatch = require("../middlewares/tryCatch");

const { displayBids } = require("../controllers/adminController");

router.get("/api/users/bids", tryCatch(displayBids));

module.exports = router;
