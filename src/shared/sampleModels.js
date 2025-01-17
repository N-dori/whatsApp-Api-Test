const sampleText = (textResponse, number) => {

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
    return data

}

const sampleImage = (imgUrl, number) => {

    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "to": number,
            "text": {
                "link": imgUrl
            },
            "type": "image",
        }
    )
    return data

}

const sampleAudio = (audioUrl, number) => {

    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "to": number,
            "text": {
                "link": audioUrl
            },
            "type": "audio",
        }
    )
    return data

}

const sampleVideo = (videoUrl, number) => {

    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "to": number,
            "text": {
                "link": videoUrl
            },
            "type": "video",
        }
    )
    return data

}

const sampleDocument = (documentUrl, number) => {

    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "to": number,
            "text": {
                "link": documentUrl
            },
            "type": "document",
        }
    )
    return data

}

const sampleLocation = (lat,lon, number) => {

    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "to": number,
            "type": "location",
            "location": {
              "latitude":lat,//"32.45800934002756",
              "longitude":lon,//"35.027855795172975",
              "name":"קיבוץ מענית",
              "address":"Kupat Holim, Ma'anit"
            }
        }
    )
    return data

}

const sampleButtons = ( number) => {

    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "type": "interactive",
            "to": number,
            "interactive": {
                "type": "button",
                "body": {
                    "text": "האם אתה מאשר"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "001",
                                "title": "✅ כן"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "002",
                                "title": "❌ לא"
                            }
                        }
                    ]
                }
            }
        }
    )
    return data

}

const sampleListButtons = (textResponse,number) => {

    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "type": "interactive",
            "to": number,

            "interactive": {
                "type": "list",
                "header": {
                    "type": "text",
                    "text": textResponse
                },
                "body": {
                    "text": "לחץ כאן כדי לצפות באפשרויות:"
                },
                // "footer": {
                //     "text": "Powered by N-DevWeb"
                // },
                "action": {
                    "button": "Select Option",
                    "sections": [
                        {
                            "title": "לפרטים",
                            "rows": [
                                {
                                    "id": "001",
                                    "title": "אנא חזרו אלי",
                                    "description": "בלחיצה ישלח אליכם לינק להשארת פרטים"
                                },

                            ]
                        },
                        {
                            "title": "רוצה להזמין סיור",
                            "rows": [
                                {
                                    "id": "002",
                                    "title": "להזמנת סיורים לקבוצות",
                                    "description": "לחץ כאן כדי להתקדם לשלב הבא"
                                },
                                {
                                    "id": "003",
                                    "title": "לכרטיסים לסיורים לחץ כאן",
                                    "description": "בלחיצה ישלח אליכם לינק לרכישת כרטיסים"
                                }
                            ]
                        },
                        {
                            "title": "מידע",
                            "rows": [
                                {
                                    "id": "004",
                                    "title": "מידע על הסיורים שאתם מציעים",
                                    "description": "בלחיצה כאן ישלח אילכם קישור עם כל הפרטים "
                                },
                               
                            ]
                        }
                    ]
                }
            }
        }


    )
    return data

}

module.exports = {
    sampleListButtons,
    sampleButtons,
    sampleLocation,
    sampleDocument,
    sampleVideo,
    sampleAudio,
    sampleText,
    sampleImage
}