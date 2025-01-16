
const fs = require("fs")
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"))

const whatsappService = require('../services/whatsappService')

const verifyToken = (req, res) => {
    try {
        var accessToken = process.env.FB_API_KEY || ''
        var token = req.query['hub.verify_token']
        var challenge = req.query['hub.challenge']
        if (challenge != null && token != null && token === accessToken) {
            res.send(challenge)
        } else {
            res.status(400).send()
        }

    } catch (error) {
        console.log('had a problem to verify token', error)
        res.status(400).send
    }
    res.send('hello from verify token')
}

const receivedMessages = (req, res) => {
    try {
        const entry = req.body?.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messageObject = value?.messages;
        //this handel a regular text message
        if (messageObject) {
            const message = messageObject[0];
            const number = message?.from;
            const text = getTextUser(message);

            console.log('User texted:', text);
            console.log('From:', number);

            // Send a WhatsApp message
            whatsappService.sendWhatsappMessage(`User says: ${text}`, number);
        } else {
            console.log('No message object found in webhook payload.');
        }

        console.log('messageObject:', messageObject);
        res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
        myConsole.log(error)
        console.log('error:', error);
        res.send('EVENT_RECEIVED')
    }
}

const getTextUser = (messages) => {
    let text = ''
    let typeMessage = messages["type"]
    if (typeMessage === 'text') {
        text = messages["text"].body
        return text
    }
    if (typeMessage === 'interactive') {
        let interactiveObject = messages["interactive"]
        let typeInteractive = interactiveObject.type
        if (typeInteractive === 'button_reply') {
            text = interactiveObject.button_reply.title
            return text
        }
        else if (typeInteractive === 'list_reply') {
            text = interactiveObject.list_reply.title
            return text
        } else {
            console.log('tried to get text but no message')

        }
    } else {
        console.log('tried to get text but no message')
    }

}

module.exports = {
    verifyToken,
    receivedMessages
}