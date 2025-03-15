const { ticketRepository } = require('../repository')
const repo = new ticketRepository.TicketRepository()
const { sendBasicMail } = require('../utility')
const fetchPendingEmails = async () => {
    try {
        const response = await repo.get({ status: "PENDING" })
        return response
    } catch (error) {
        console.log(error);
    }
}
const updateTicket = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data)
        return response
    } catch (error) {
        console.log(error);
    }
}
const createNotification = async (data) => {
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}
const subscribeEvents = async (payload) => {
    let service = payload.service;
    switch (service) {
        case 'CREATE_TICKET':
            await createNotification(payload)
            break;
        case 'SEND_BASIC_MAIL':
            await sendBasicMail.sendMail()
            break;
        default:
            console.log("No valid event recieved");
            break;
    }
}
module.exports = {
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvents
}