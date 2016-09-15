var express = require('express');
var http = require('http');
var request = require('request');

// Initialise
var app = express();

/**
 * Set up CORS Settings
 */ app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});/**
    */

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var moment = require("moment");

/** Set Up Logging
 */ var winston = require('winston');
global.__logger = new (winston.Logger)({
    level : 'silly',
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            timestamp: function(){
		return moment().format("YYYY-MM-DD HH:mm:ss Z");
		}
        }),
        new (winston.transports.File)({
            filename: './logs/server.log',
            timestamp: function(){
                return moment().format("YYYY-MM-DD HH:mm:ss Z");
                }
        })
    ]
});
/**
*/

var Engine = require('./application-logic');
var ajax = require("./ajax");
var moment = require("moment");
var CONSTANTS = require("./CONSTANTS");

// Open API for receieving POst req
app.post('/pushsmslcdc', function(req, res){

    const logID = "["+req.body.msgId + "#" + req.body.sender + "] -> ";
    __logger.info(logID+"====[[[[SMS Arrived]]]]==== "+"["+req.body.content+"] rcvd["+req.body.rcvd+"]");

    try{

        if (ajax.nvbdcpParser(req.body.content)){
            ajax.forwardMessage(CONSTANTS.NVBDCP_FORWARD_URL,req.body,callback);
        }else{
            Engine.processData(logID,req.body);
        }

    }catch(error){
        __logger.fatal(logID+error);
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');

    function callback(error,response,body){
        if(error == null){
            __logger.info(logID+"[Forward+]");
        }else{
            __logger.error(logID+"[Forward-]"+error.message);
        }
    }
});


var server = app.listen(8001, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Server listening at http://%s:%s", host, port)

})


