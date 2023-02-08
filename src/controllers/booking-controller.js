const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const bookingService = new BookingService();

class BookingController {
  constructor() {}

  // publish message to queue
  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is the noti from queue",
        content: "Somebody will subscribe from this queue",
        recepientEmail: "poorvaditya18@gmail.com",
        notificationTime: "2023-02-08T10:00:00",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "Succesfully published the event",
    });
  }

  async create(req, res) {
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
  }
}

module.exports = BookingController;
