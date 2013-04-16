// basic websocket server that echos 

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

var wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

// this allows communication between a and b
var a,b;

wsServer.on('request', function(request) {

	console.log("origin", request.origin);

    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept('echo-protocol', request.origin);

    console.log((new Date()) + ' Connection accepted.');

    
    var end;

    connection.on('message', function(message) {


            console.log('Received Message: ' + message.utf8Data);
            
    	if (message.type === 'utf8' && !end){
    		end = message.utf8Data;
    		if(end === 'a'){
    			a = connection;
    		}
    		else if(end === 'b'){
    			b = connection;
    		}
    	}
        else if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            if(end === 'a' && b){
            	b.sendUTF(message.utf8Data);
            }
            if(end === 'b' && a) {
            	a.sendUTF(message.utf8Data);
            }
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function(reasonCode, description) {
    	// delete channels[channel][id];
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});