const https = require('https')

const sendWhatsappMessage = (textResponse, number) => {
console.log('hello from sendWhatsappMessage')
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
    headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${process.env.FB_API_KEY}`  
    }
}

const req = https.request(options ,res => {
    let responseData = '';
        res.on("data", (chunk) => {
            responseData += chunk;
        });

        res.on("end", () => {
            console.log(`Response: ${responseData}`);
            if (res.statusCode < 200 || res.statusCode >= 300) {
                console.error(`API Error: ${res.statusCode}, ${responseData}`);
            }
        });
})
req.on("error", error => {
    console.log('Request error',error)
})

req.write(data)
req.end()
}

module.exports ={
    sendWhatsappMessage
}