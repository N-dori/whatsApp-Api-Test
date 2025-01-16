const http = require('http')

const sendWhatsappMessage = (textResponse, number) => {

const data = JSON.stringify(
    {
        "messaging_product": "whatsapp",    
        "to": number,
        "text": {
            "body": textResponse
        },
        "type": "text",
    }
)

const options = {
    host: "graph.facebook.com",
    path: "/v21.0/517548194783262/messages" ,
    method:"POST",
    body:data,
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${process.env.FB_API_KEY}`  
    }
}

const req = http.request(options ,res => {
    res.on("data", d =>{
        process.stdout.write(d)
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