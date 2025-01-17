
const whatsappService = require('../services/whatsappService')

const samples = require('../shared/sampleModels')

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
                const textResponse = 'תודה על פנייתך לחוות הרוח בגלבוע, איך אפשר לעזור?'
                const data = samples.sampleListButtons(textResponse,number)
                whatsappService.sendWhatsappMessage(data);
            // Send a WhatsApp message
        } else {
            console.log('No message object found in webhook payload.');
        }

        console.log('messageObject:', messageObject);
        res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send('Error processing the request');
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