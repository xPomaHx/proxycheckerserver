//server.js
const express = require('express'),
    app = express(),
    url = require('url'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    getProxyType = require('check-proxy').ping;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
var i = 0;
const ping = function(req, res) {
    i++;
    console.log(i);
    //console.log('ip', req.connection.remoteAddress);
    //console.log('headers', req.headers);
    //console.log('cookies', req.cookies);
    res.json(getProxyType(req.headers, req.query, req.body, req.cookies));
}
app.get('/', ping);
app.post('/', ping);
var ipaddress = "188.134.2.171";
var port = 9999;
app.listen(port, function() {
    console.log('%s: Node server started on %s:%d ...', Date(Date.now()), ipaddress, port);
});
/*
var net = require('net');
var server = net.createServer(function(socket) {
    socket.write("HTTP/1.1 200 OK\r\n");
    socket.on('data', function(data) {
        //console.dir("" + data);
        socket.write("Content-Length: " + data.length + "\r\n");
        socket.write("\r\n");
        //socket.write("remoteAddress:" + socket.remoteAddress + "\r\n");
        //socket.write("localAddress:" + socket.localAddress + "\r\n");
        console.dir(data.toString());
        socket.end(data.toString());
    });
    // Remove the client from the list when it leaves
    socket.on('end', function() {});
});
server.listen(9999, '192.168.1.35');*/