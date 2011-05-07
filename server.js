#!/usr/bin/env node
var http = require('http'),  
    io = require('socket.io'),
    sys = require('sys'),
    fs = require('fs'),
    url = require("url"),  
    path = require("path"),
    IRC = require("irc-js")

var settings = require('./config')

server = http.createServer(function(request, response) {  
    var uri = url.parse(request.url).pathname;
    if (uri == "/") {
        uri = "/index.html";
    }
    if (uri == "/black") {
        response.writeHead(200);  
        response.write('<html><body style="background-color: black;"></body></html>');  
        response.end();
        return;
    }
    var filename = path.join(process.cwd(), uri);
    path.exists(filename, function(exists) {  
        if(!exists) {  
            response.writeHead(404, {"Content-Type": "text/plain"});  
            response.write("404 Not Found\n");  
            response.end();  
            return;  
        }  
  
        fs.readFile(filename, "binary", function(err, file) {  
            if(err) {  
                response.writeHead(500, {"Content-Type": "text/plain"});  
                response.write(err + "\n");  
                response.end();  
                return;  
            }  
  
            response.writeHead(200);  
            response.write(file, "binary");  
            response.end();  
        });  
    });  
})
server.listen(SETTINGS.PORT);

var monitor = null;
var irc = null;
var socket = io.listen(server); 
socket.on('connection', function(client){ 
    sys.puts('Monitor connected');
    monitor = client;
    client.on('message' , function(event) {
        console.log(event);
        if (irc != null) {
            irc.privmsg(SETTINGS.IRC.channel, event);
        }
    });
    client.on('disconnect', function() {
        monitor = null;
        sys.puts('Monitor disconnected');
    });
}); 

irc = new IRC( SETTINGS.IRC );
irc.connect(function () {
    irc.join(SETTINGS.IRC.channel);
    irc.addListener('privmsg', function (event) {
        if (monitor != null) {
            monitor.send(event['params'][1])
        }
    });
});
