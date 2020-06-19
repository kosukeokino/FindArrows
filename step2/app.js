'use strict';

var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static(__dirname + '/../gameprt'));
console.log('running!');

var socket = require('socket.io');
var io = socket(server);

class Player{
    constructor(){
        this.name;
        this.role;
        this.score = 0;
        this.id;
    }
}

let players = [];
let id = 1;

io.sockets.on('connection', function(socket){
    console.log('new connection: '+socket.id);
    
    let player = new Player;
    player.id = id;
    id++;

    socket.on('add user', function(playername){
        player.name = playername;
        let numopl = players.length;
        players[numopl] = player;
        //乱数で鬼決め（参加者があるたびにリセット)
        let rndm = Math.floor(Math.random() * (numopl + 1))
        for(let i = 0; i < numopl+1; i++){
            players[i].role = 'R';
        }
        players[rndm].role = 'C';

        console.log('++++++++++');
        for(let i = 0; i < numopl+1; i++){
            console.log(players[i].id + " : " + players[i].name + " : " + players[i].role);
        }
        console.log('++++++++++');

        io.sockets.emit('entry', players);
    });

    socket.on('gamestart', function(){
        io.sockets.emit('gamestarts',players);
    });
    
    socket.on('test',function(data){
        console.log(data.h);
    })

});

