const { Booking } = require("../models/index");

const { ValidationError, AppError } = require("../utils/errors/index");

const { StatusCodes } = require("http-status-codes");

class BookingRepository {
  // Create Booking
  async create(data) {
    // data -> flightId, userId,status,noOfSeats,totalCost
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "Repository Error",
        "Cannot create Booking",
        "There was some issue creating the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // update Booking
  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (error) {
      throw new AppError(
        "Repository Error",
        "Cannot update Booking",
        "There was some issue updating the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
