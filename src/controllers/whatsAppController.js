
const fs =require("fs")
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"))

const whatsappService = require('../services/whatsappService')

const verifyToken =(req,res) => {
  try {
    var accessToken = process.env.FB_API_KEY||''
    var token = req.query['hub.verify_token']
    var challenge = req.query['hub.challenge']
    if(challenge != null && token != null && token === accessToken){
        res.send(challenge)
    } else {
        res.status(400).send()
    }

  } catch (error) {
    console.log('had a problem to verify token',error)
    res.status(400).send
}
    res.send('hello from verify token')
}

const receivedMessages =(req,res) => {
    try {
        var entry = (req.body["entry"])[0]
        var changes = (entry["changes"])[0]
        var value = changes["value"]
        var messageObject = value["messages"]
        //this handel a regular text message
        if(messageObject !== "undefined"){
            var messages = messageObject[0]
            const number = messages["from"]
            var text = getTextUser(messages)
            console.log('user texted : :',text);
            console.log('from :',number);
            whatsappService.sendWhatsappMessage("user say :" + text,number)
        }
        
        console.log('messageObject:',messageObject);
        
    } catch (error) {
        myConsole.log(error)
        console.log('error:',error);
        res.send('EVENT_RECEIVED')
    }
}

const getTextUser = (messages)=>{
    let text = ''
    let typeMessage =messages["type"]
    if(typeMessage === 'text'){
        text = messages["text"].body
        return text
    }
    if (typeMessage === 'interactive'){
        let interactiveObject = messages["interactive"]
        let typeInteractive = interactiveObject.type
        if(typeInteractive === 'button_reply'){
            text = interactiveObject.button_reply.title
            return text
        }
       else if(typeInteractive === 'list_reply'){
            text = interactiveObject.list_reply.title
            return text
        }else {
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