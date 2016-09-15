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
        callback(error,response,body);
    });
}


exports.postWithoutDataReq = function(url,auth,callback) {
    request({
        url: url,
        method: "POST",
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json",
        }
    }, function (error, response, body) {
        callback(error,response,body);
    });
}

    exports.getReq = function(url,auth,callback) {
        request({
            url: url,
            method: "GET",
            headers: {
                "Authorization": auth
            }
        }, function (error, response, body) {
                callback(error,response,body);

        });
    }
        exports.getReqWithoutAuth = function(url,callback){
            request({
                url: url,
                method: "GET"
            }, function (error, response, body){
                callback(error,response,body);
            });

    }


exports.forwardMessage = function(url,body,callback){

    request({
        url: url,
        method: "POST",
        json: true,   // <--Very important!!!
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    }, function (error, response, body) {
        callback(error,response,body);
    });
}


exports.nvbdcpParser = function(message){
    message = JSON.parse(JSON.stringify(message));

    message = message.replace(/[<>~`"'!@#$%^&*()_;:,.?=/+\{}\[\]\\-]+/g," ");
    message = message.toLowerCase().trim();

    message = message.replace(/female/g,"");
    message = message.replace(/femel/g,"");
    message = message.replace(/male/g,"");
    message = message.replace(/mel/g,"");


    message = message.replace(/side effect/g,"");
    message = message.replace(/sideeffect/g,"");
    message = message.replace(/effect/g,"");


    message = message.replace(/919293210011/g,"");
    message = message.replace(/9293210011/g,"");

    message = message.replace(/se/g,"");
    message = message.replace(/to/g,"");

    message = message.replace(/m/g,"");
    message = message.replace(/f/g,"");
    message = message.replace(/o/g,"0");

    message = message.replace(/\s+/g," ").trim();

    var pattern = /^\s*\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s*\d*\s*$/;

    if (pattern.test(message)){
        return true
    }

    return false;
}