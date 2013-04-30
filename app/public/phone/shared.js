// any message sent to this will be posted out to
// the other conntected windows
var ports = [];
onconnect = function(e) {
    var port = e.ports[0];
    ports.push(port);

    port.onmessage = function(e){
        // broadcast to other
        ports.forEach(function(p){
            if(p !== port){
                p.postMessage(e.data);
            }
        });
    };
};