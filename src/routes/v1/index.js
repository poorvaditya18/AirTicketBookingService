const express = require("express");
// const { BookingController } = require("../../controllers/index");
const BookingController = require("../../controllers/booking-controller");
const router = express.Router();

router.post("/bookings", BookingController.create);

module.exports = router;
