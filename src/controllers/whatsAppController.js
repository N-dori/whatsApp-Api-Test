
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
                    
                const urlText = 'יש לציין *שם, טלפון ומייל לחזרה* דרך הלינק המצורף ונחזור אלייך בהקדם האפשרי תודה! https://windfarm.co.il/%d7%a6%d7%a8%d7%95-%d7%a7%d7%a9%d7%a8/';
                
                const dataForUrlText = messageType.urlText(urlText, number);
                
                whatsappService.sendWhatsappMessage(dataForUrlText)
                res.status(200).send('EVENT_RECEIVED');

                    return 

                }
                if(text === 'להזמנת סיורים לקבוצות'){
                    const txt = " להזמנת סיורים לקבוצות יש לציין שם ומשפחה \nטלפון\nכתובת מייל\n\nעבור מי הסיור?\nכמה משתתפים?\nבאיזה תאריך?\n\nמי הגוף המשלם על הסיור ו מספר ח.פ.?\n\nטלפון איש קשר בהנהלת חשבונות\n\n*לאחר קליטת הפרטים אצלנו נחזור אליכם עם אישור קיום הפעילות*"
                const urlText = `${txt} https://windfarm.co.il/%d7%a6%d7%a8%d7%95-%d7%a7%d7%a9%d7%a8/`;
                
                const dataForUrlText = messageType.urlText(urlText, number);
                
                whatsappService.sendWhatsappMessage(dataForUrlText)
                res.status(200).send('EVENT_RECEIVED');

                    return 

                }
                if(text === 'לכרטיסים לסיורים'){
                    const txt = '\nלרכישת כרטיסים לחץ כאן'
                const urlText = `${txt} https://tickchak.co.il/13609`;
                
                const dataForUrlText = messageType.urlText(urlText, number);
                
                whatsappService.sendWhatsappMessage(dataForUrlText)
                res.status(200).send('EVENT_RECEIVED');

                    return 

                }
                if(text === 'מידע על הסיורים'){
                    const txt = '\nלמידע על הסיורים שאנחנו מציעים לחץ כאן'
                const urlText = `${txt} https://windfarm.co.il/`;
                
                const dataForUrlText = messageType.urlText(urlText, number);
                
                whatsappService.sendWhatsappMessage(dataForUrlText)
                res.status(200).send('EVENT_RECEIVED');

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