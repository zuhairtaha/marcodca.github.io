
import request from 'request';

const url = 'http://api.jsonbin.io/b/5bacd7188713b17b52b01398';

export async function getJSON() {
    const prom = new Promise((resolve, reject) => {
        request(url + "/latest", function (error, response, body) {
            resolve(body);
        });
    })
    const final = await prom;
    return JSON.parse(final)
}

export function updateJSON(update) {
    const send = {data: [...update]}
    request({
        headers: {
            "Content-type": "application/json",
            "versioning": false
        },
        uri: url,
        method: "PUT",
        json: send
    }, function (error, response, body) {
        if (error) console.log(error);
        console.log(body);
    });
    
}


