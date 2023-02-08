const amqplib = require("amqplib");

const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

const createChannel = async () => {
  try {
    // 1. connection with the rabbitmq
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    // 2. channel will help create link to queue which help in communication
    const channel = await connection.createChannel();
    //3.  Here Reminder Service will be acting as the exchanger.
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

//subscriber -
// binding_key ensures that to which queue you are sending the message

const subscribeMessage = async (channel, service, binding_key) => {
  try {
    const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");
    // ensure : you should have same binding queue
    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, (msg) => {
      console.log("Received Data");
      console.log(msg.content.toString());
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

//publisher -
const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue("REMINDER_QUEUE");
    // message are produced in binary form so we need buffer()
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

module.exports = { subscribeMessage, createChannel, publishMessage };
