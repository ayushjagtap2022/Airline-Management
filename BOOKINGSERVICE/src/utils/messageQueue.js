const amqplib = require('amqplib')
const { serverConfig } = require('../config')
const createChannel = async () => {
    try {

        const connection = await amqplib.connect(serverConfig.MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(serverConfig.EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
}
const subscribeMessage = async (channel, service, binding_key) => {
    try {

        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE');
        channel.bindQueue(applicationQueue.queue, serverConfig.EXCHANGE_NAME, binding_key);
        channel.consume(applicationQueue.queue, msg => {
            console.log('received data');
            console.log(msg.content.toString());
            channel.ack(msg)
        })
    } catch (error) {
        throw error
    }
}
const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue('REMINDER_QUEUE');
        await channel.publish(serverConfig.EXCHANGE_NAME, binding_key, Buffer.from(message))
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}