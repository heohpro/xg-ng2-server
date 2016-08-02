var koa = require('koa');
var fs = require('fs');
var koaStatic = require('koa-static');
//var liveload = require('koa-liveload');
var session = require('koa-session');


var path = require('path');
var router = require('./routes.js');
var app = koa();

const WEBROOT = '../../avalon-www/dist'

app.use(router.routes());

//app.use(liveload(__dirname, {
//}))

app.use(koaStatic(path.resolve(__dirname, WEBROOT), {
    maxage: 31536e6
}));

//app.listen(3000);

var server = require('http').Server(app.callback()),
    io = require('socket.io')(server);

//io.on('connect', function(socket) {
//    console.log("A new player is connecting.");
//    //socket.emit('newPlayer');
//    socket.on('newPlayer', function(data) {
//        console.log(data+" is join.");
//    });
//})

server.listen(1338);
console.log("listen port:1338");





