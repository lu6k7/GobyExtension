const request = require('request');


function RequestAndParse(url, jar, proxy, headers, data, beginIndex, endIndex) {
    let resultObj = sendPostRequestBinary(url, jar, proxy, headers, data)
    // let resData = bytes.TrimRight(resultObj.Data, "\r\n\r\n")
    // if ((beginIndex !== 0 || endIndex !== 0) && resData.length - endIndex >= beginIndex) {
    //     resData = resData.slice(beginIndex, len(resData) - endIndex)
    // }

    return resultObj
}


function sendPostRequestBinary(urlPath, jar, proxy, headers, data) {
    return new Promise((resolve, reject) => {
            request(urlPath, {
                jar: jar,
                proxy: proxy,
                method: "POST",
                encoding: null,
                headers: headers,
                body: data
            }, (error, response, body) => {
                console.log(error)
                if (!error) {
                    body = body.toString('hex')
                    if (body.substr(body.length - 8, body.length) === "0d0a0d0a") {
                        body = body.substr(0, body.length - 8);
                    }
                    resolve(body);
                } else {
                    console.log(error)
                    reject(error);
                }
            });
    })
}


module.exports = {RequestAndParse, sendPostRequestBinary}
