const { emailConfig, serverConfig } = require('../config');
const { ticketService } = require('../services');
const sendMail = async () => {
    try {
        const response = await ticketService.fetchPendingEmails();
        console.log(response);
        response.forEach(async (email) => {
            try {
                const Transport = await emailConfig.configEmail();
                const mailOptions = {
                    from: serverConfig.EMAIL,
                    to: email.recepientEmail,
                    subject: email.subject,
                    text: email.content,
                    html: `<h2>${email.content}</h2>`
                };
                Transport.sendMail(mailOptions, async (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                        await ticketService.updateTicket(email.id, { status: "SUCCESS" })
                    }
                });
                console.log('Email sent:', result);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        });
    } catch (error) {
        console.error('Error fetching pending emails:', error);
    }
}
module.exports = {
    sendMail
}