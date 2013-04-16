var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

var server = BinaryServer({port: 9000});
server.on('connection', function(client){

  // client.on('stream', function(stream, meta){
  //   var file = fs.createWriteStream('out.png');
  //   stream.pipe(file);
  // }); 

  client.on('stream', function(stream, meta){

    console.log('0>', meta);
    //
    var file = fs.createWriteStream('out.png');
    stream.pipe(file);
    //
    // Send progress back
    stream.on('data', function(data){
        console.log("-----", data.length);
      stream.write({rx: data.length / meta.size});
    });
    //
  });
});