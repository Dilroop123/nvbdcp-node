/**
 * Created by harsh on 18/7/16.
 */

var request = require('request');

exports.postReq = function(url,data,auth,callback) {
    request({
        url: url,
        method: "POST",
        json: true,   // <--Very important!!!
        body: data,
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json",
        }
    }, function (error, response, body) {
        console.log(body);

        if (error == null) {
            callback(body);
        } else {
            callback(body);
        }
    });
}

    exports.getReq = function(url,auth,callback){
        request({
            url: url,
            method: "GET",
            headers : {
                "Authorization" : auth
            }
        }, function (error, response, body){
            body = JSON.parse(body);

            if (error == null){
                callback(body);
            }else{
                callback(body);
            }
        });

    }