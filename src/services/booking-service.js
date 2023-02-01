const axios = require("axios");
const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors/index");

class BookingService {
  constructor() {
    //booking repository object
    this.BookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    // Based on flightId  we need to make request to flight service and fetch th flight using axios
    try {
      const flightId = data.flightId;
      const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;

      // communicate btw 2 services
      const response = await axios.get(getFlightRequestUrl);
      //   console.log("From Booking Service", flight.data.data);

      const flightData = response.data.data;
      let priceOfTheFlight = flightData.price;

      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in the booking process",
          "Insufficient Seats in the flight"
        );
      }
      const totalCost = priceOfTheFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.BookingRepository.create(bookingPayload);
      console.log("BOOKING", booking);
      const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestUrl, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const finalBooking = await this.BookingRepository.update(booking.id, {
        status: "Booked",
      });
      return finalBooking;
    } catch (error) {
      if (error.name == "Repository Error" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
