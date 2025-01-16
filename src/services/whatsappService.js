const http = require('http')

const sendWhatsappMessage = (textResponse, number) => {

const data = JSON.stringify(
    {
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        }
    }
)

const options = {
    host: "graph.facebook.com",
    path: "/v21.0/517548194783262/messages" ,
    method:"POST",
    body:data,
    headers:{
        "Content-Type":"application/json",
        authorization:`Bearer ${process.env.FB_API_KEY}`  
    }
}

const req = http.request(options ,res => {
    res.on("data", data =>{
        process.stdout.write(data)
    })
})
req.on("error", error => {
    console.log('error',error)
})

req.write(data)
req.end()
}

module.exports ={
    sendWhatsappMessage
}