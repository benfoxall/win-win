// *******************
// file server on 3000


(function(){

    var express = require('express'),
        app = express(),
        server = require('http').createServer(app);

    // serve static files
    app.use(express.static(__dirname + '/public'));

    server.listen(3000);

}());


// *******************
// socket.io on 3001


(function(){

    var app = require('http').createServer(handler),
        io = require('socket.io').listen(app),
        fs = require('fs');


    app.listen(3001);

    // quiet IO!
    io.set('log level', 2);

    function handler (req, res) {
        res.writeHead(200);
        res.end('hello');
    }

    io.sockets
    .on('connection', function (socket) {
      socket.on('message', function (data) {
        console.log("data>", data);
        socket.broadcast.send(data);
      });
    });


}());


// *******************
// binaryjs on 3002

(function(){


    //Start Binary.js server
    var BinaryServer = require('binaryjs').BinaryServer;

    var bs = BinaryServer({port:3002});

    // Wait for new user connections
    bs.on('connection', function(client){
      // Incoming stream from browsers
      client.on('stream', function(stream, meta){

        for(var id in bs.clients){
            if(bs.clients.hasOwnProperty(id)){
                var otherClient = bs.clients[id];
                if(otherClient !== client){
                    console.log('sending: ' + client.id + '---->' + otherClient.id);

                    otherClient.send("SUP?");
                    var send = otherClient.createStream(meta);
                    stream.pipe(send);
                }
            }
        }


        //
    //    var file = fs.createWriteStream(__dirname+ '/public/' + meta.name);
      //  stream.pipe(file);
        //
        // Send progress back
        // stream.on('data', function(data){
        //   stream.write({rx: data.length / meta.size});
        // });
        //
        stream.on('data', function(data){
            console.log("binaryjs>", data.length);
        });
      });
    });



}())