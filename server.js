#!/usr/bin/env node
/*
Copyright © Julien Duponchelle
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
The Software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software.
*/

var http = require('http'),  
    io = require('socket.io'),
    sys = require('sys'),
    fs = require('fs'),
    url = require("url"),  
    path = require("path")

var settings = require('./config');
var consoles = {};

try {
    displays = fs.readFileSync("display.json");
    displays = JSON.parse(displays);
}
catch (error) {
    var displays = [
        [
            {
                windows: []
            },
        ],
    ];
}

function return_html(response, html) {
    response.writeHead(200);  
    response.write(html);  
    response.end();
}

console_server = http.createServer(function(request, response) {  
    var uri = url.parse(request.url).pathname;
    if (uri == "/") {
        uri = "/console.html";
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
console_server.listen(SETTINGS.CONSOLE_PORT);

monitor_server = http.createServer(function(request, response) {
    var u = url.parse(request.url, true);
    var uri = u.pathname;
    switch (uri) {
        case "/":
            uri = "/index.html";
        break;
        
        case "/black": 
            return_html(response, '<html><body style="background-color: black;"></body></html>');
        return;

        case "/image": 
            html = '<html><style>html {background: url("'+ u.query['u'] +'") no-repeat center center fixed;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;}"</style><body></body></html>';
            return_html(response, html);
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
monitor_server.listen(SETTINGS.MONITOR_PORT);

var monitor = null;
var socket_monitor = io.listen(monitor_server); 
socket_monitor.on('connection', function(client){ 
    sys.puts('Monitor connected');
    monitor = client;
    for (var i = 0; i < displays[0].length ; i++) {
        client.send(JSON.stringify(displays[0][i]));
    }
    client.on('disconnect', function() {
        monitor = null;
        sys.puts('Monitor disconnected');
    });
}); 

var socket_console = io.listen(console_server); 
socket_console.on('connection', function(client) {
    consoles[client['sessionId']] = client;
    sys.puts('Console connected (' + Object.keys(consoles).length + ' console connected)');
    for (var i = 0; i < displays[0].length ; i++) {
        client.send(JSON.stringify(displays[0][i]));
    }
    client.on('message' , function(event) {
        console.log(event);
        if (monitor != null) {
            monitor.send(event);
        }
        for (cons in consoles) {
            if (cons != client['sessionId']) {
                consoles[cons].send(event);
            }
        }
        cmd = JSON.parse(event);
        displays[0][cmd['window']] = cmd;
        fs.writeFile('display.json', JSON.stringify(displays));
    });
    client.on('disconnect', function() {
        delete consoles[client['sessionId']];
        sys.puts('Console disconnected (' + Object.keys(consoles).length + ' console connected)');
    });
}); 

