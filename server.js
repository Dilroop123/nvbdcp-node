var express = require('express');
var http = require('http');
var request = require('request');
var Engine = require('./application-logic');

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

var ajax = require("./ajax");
var moment = require("moment");
var CONSTANTS = require("./CONSTANTS");

// Open API for receieving POst req
app.post('/pushSMS', function(req, res){

    const logID = "["+req.body.msgId + "#" + req.body.sender + "] -> ";
    __logger.info(logID+"====[[[[SMS Arrived]]]]==== "+"["+req.body.content+"] rcvd["+req.body.rcvd+"]");

    try{

        if (ajax.lcdcParser(req.body.content)){
             ajax.forwardMessage(CONSTANTS.LCDC_FORWARD_URL,req.body);
        }else{
            Engine.processData(logID,req.body);

        }

        //if (req.body.sender == "919654232779")
        //{
        //    //ajax.forwardMessage(req.body);
        //}
        //else{
        //
        //}

    }catch(error){
        __logger.fatal(logID+error);
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');
});


var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Server listening at http://%s:%s", host, port)

})


