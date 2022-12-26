const { Booking } = require("../models/index");

const { ValidationError, AppError } = require("../utils/errors/index");

const { StatusCodes } = require("http-status-codes");

class BookingRepository {
  // CRUD

  //create
  //logic for booking we will write later
  async create(data) {
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

  //update 
  async update(data)
  {
    try {
        
    } catch (error) {
        
    }
  }
}

module.exports = BookingRepository;
