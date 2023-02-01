const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    console.log("Response from Booking Controller", response);
    return res.status(StatusCodes.OK).json({
      message: "Succesfully Completed Booking",
      success: true,
      err: {},
      data: response,
    });
  } catch (error) {
    console.log("From Booking Controller", error);
    return res.status(error.statusCode).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};

module.exports = {
  create,
};
