const verifyToken =(req,res) => {
  try {
    let accessToken = process.env.FB_API_KEY||''
    let token = req.query('hub.verify_token')
    let challenge = req.body('hub.challenge')
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
    res.send('hello from received messages')
}

module.exports = {
    verifyToken,
    receivedMessages
}