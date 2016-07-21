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


/** Set Up Logging
 */ var log4js = require("log4js");
log4js.configure({
    appenders: [
        {
            type: "console"
        },
        {
            type: "file",
            filename: "./logs/server.log",
            category: "nvbdcp"
        }
    ]
});
global.__logger  = log4js.getLogger('nvbdcp');
    /**
     */

// Open API for receieving POst req
app.post('/pushSMS', function(req, res){

    const logID = "["+req.body.id + "#" +req.body.date + "#" + req.body.number + "] -> ";
    __logger.info(logID+"SMS Arrived "+"["+req.body.message+"]");

    try{
        Engine.processData(logID,req.body);
    }catch(error){
        __logger.info(logID+error);
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');
});


var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Server listening at http://%s:%s", host, port)

})


