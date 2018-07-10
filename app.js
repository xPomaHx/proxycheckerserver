//server.js
process.setMaxListeners(0);
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
//var i = 0;
const ping = function(req, res) {
    //  i++;
    //console.log(i);
    //console.log('ip', req.connection.remoteAddress);
    //console.log('headers', req.headers);
    //console.log('cookies', req.cookies);
    res.json(getProxyType(req.headers, req.query, req.body, req.cookies));
}
app.get('/', ping);
app.post('/', ping);
var ipaddress = "http://188.242.32.158";
var port = 9998;
/*app.listen(port, function() {
    console.log('%s: Node server started on %s:%d ...', Date(Date.now()), ipaddress, port);
});*/
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


var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Proxy = require(__dirname + '/models/Proxy.js');
/*mongoose.connect("mongodb://localhost:27017/proxycombain");
app.use(express.static('public'));
app.get('/insert', (req, res) => {
    res.sendFile(__dirname + '/public/insert.html');
});
app.post('/insert', (req, res) => {
    var proxies = req.body.proxies;
    var regprox = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})[^0-9]{1,100}([0-9]{1,5})/gm;
    var proxylist = proxies.match(regprox);
    proxylist = [...(new Set(proxylist))];
    proxylist = proxylist.map(ipport => {
        var ipports = ipport.split(":");
        return {
            ipport,
            port: ipports[1],
            ip: ipports[0],
        }
    });
    if (proxylist.length != 0) {
        var bulk = Proxy.collection.initializeOrderedBulkOp();
        proxylist.forEach((el) => {
            bulk.find({
                ipport: el.ipport
            }).upsert().updateOne(el);
        });
        bulk.execute(function(er, rez) {
            if (rez) {
                res.send("Вставлено: " + rez.nUpserted);
            } else {
                res.send(er);
            }
        });
    } else {
        res.send("Не переданно не 1 прокси");
    }
});
*/
app.get('/proxy/getall', (req, res) => {
    console.dir("/proxy/getall start");

    Proxy.find((er, rez) => {
        console.dir("/proxy/getall end");
        res.json(rez);
    });
});
/*
app.get('/proxy/get', (req, res) => {
    Proxy.findOne().sort({
        date: -1
    }).limit(1).exec((er, rez) => {
        res.json(rez);
    });
});*/
http.listen(port, function() {
    console.log('listening on *:' + port);
});
/*
io.on('connection', function(socket) {
    socket.on('addProxies', function(proxies, clb) {
        var regprox = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}:[0-9]{1,5}/g;
        var proxylist = proxies.match(regprox);
        proxylist = [...(new Set(proxylist))];
        proxylist = proxylist.map(ipport => {
            var ipports = ipport.split(":");
            return {
                ipport,
                port: ipports[1],
                ip: ipports[0],
            }
        });
        if (proxylist) {
            var bulk = Proxy.collection.initializeOrderedBulkOp();
            proxylist.forEach((el) => {
                bulk.find(el).upsert().updateOne(el);
            });
            bulk.execute(function(er, rez) {
                if (rez) {
                    var upserted = rez.getRawResponse().upserted;
                    if (upserted && upserted.length > 0) {
                        upserted = upserted.map((el) => {
                            var i = el.index;
                            proxylist[i]._id = el._id;
                            el = proxylist[i];
                            return el;
                        });
                        socket.emit('updateProxy', upserted);
                    }
                    clb("Добавленно " + rez.nUpserted + " записей");
                } else {
                    clb("Не добавленно");
                }
            });
        } else {
            clb("Не переданно не 1 прокси");
        }
    });
});*/