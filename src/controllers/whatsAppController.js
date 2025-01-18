
const whatsappService = require('../services/whatsappService')

const messageType = require('../shared/models')

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
            
                if(text === 'אנא חזרו אלי'){
                    
                const textResponse = 'יש לציין שם, טלפון ומייל לחזרה דרך הלינק המצורף ונחזור אלייך בהקדם האפשרי תודה!'
                const urlText = 'https://windfarm.co.il/%d7%a6%d7%a8%d7%95-%d7%a7%d7%a9%d7%a8/';
                
                const dataForText = messageType.text(textResponse, number);
                const dataForUrlText = messageType.urlText(urlText, number);
                
                // Send the first message
                whatsappService.sendWhatsappMessage(dataForText)
                    .then(() => {
                        // Use a delay for the second message
                        setTimeout(() => {
                            whatsappService.sendWhatsappMessage(dataForUrlText)
                                .then(() => {
                                    // Respond after all messages are sent
                                    res.status(200).send('EVENT_RECEIVED');
                                })
                                .catch((error) => {
                                    console.error('Error sending second message:', error);
                                    res.status(500).send('Error sending message');
                                });
                        }, 200);
                    })
                    .catch((error) => {
                        console.error('Error sending first message:', error);
                        res.status(500).send('Error sending message');
                    });

                    return 

                }
              

                const textResponse = 'תודה על פנייתך לחוות הרוח בגלבוע, איך אפשר לעזור?'
                const dataForText = messageType.text(textResponse,number)
                whatsappService.sendWhatsappMessage(dataForText);
                const buttonListTitle ='לפתיחת תפריט האפשרויות'
                const dataForButtonList = messageType.listButtons(buttonListTitle,number)
                whatsappService.sendWhatsappMessage(dataForButtonList);
                console.log('messageObject:', messageObject);
                res.status(200).send('EVENT_RECEIVED');
            // Send a WhatsApp message
        } else {
            console.log('No message object found in webhook payload.');
        }

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