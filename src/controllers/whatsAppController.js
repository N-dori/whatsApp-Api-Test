const verifyToken =(req,res) => {
    res.send('hello from verify token')
}
const receivedMessages =(req,res) => {
    res.send('hello from received messages')
}

module.exports = {
    verifyToken,
    receivedMessages
}