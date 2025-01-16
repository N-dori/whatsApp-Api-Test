
const fs =require("fs")
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"))

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
        myConsole.log(messageObject)
        console.log('messageObject:',messageObject);
        
    } catch (error) {
        myConsole.log(error)
        console.log('error:',error);
        res.send('EVENT_RECEIVED')
    }
}

module.exports = {
    verifyToken,
    receivedMessages
}