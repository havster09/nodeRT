function handleHTTP(req,res) {
    if (req.method == "GET") {
        if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
            req.addListener("end",function(){
                req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
                static_files.serve(req,res);
            });
            req.resume();
        }
        else {
            res.writeHead(403);
            res.end();
        }
    }
    else {
        res.writeHead(403);
        res.end();
    }
}


var
    http = require("http"),
    httpserv = http.createServer(handleHTTP),

    port = 8006,
    host = "127.0.0.1",

    ASQ = require("asynquence"),
    node_static = require("node-static"),
    static_files = new node_static.Server(__dirname),

    io = require("socket.io").listen(httpserv);

function handleIO(socket){
    function disconnect(){
        clearInterval(intv);
        console.log("client disconnected");
    }
    console.log("client connected");
    socket.on("disconnect",disconnect)
    var intv = setInterval(function(){
        socket.emit("hello",Math.random());
    },1000);

    function getmsg(msg) {
        io.sockets.emit("broadcast",msg);
    }
    socket.on("msg",getmsg);
}

io.on("connection",handleIO);

// configure socket.io
io.configure(function(){
    io.enable("browser client minification"); // send minified client
    io.enable("browser client etag"); // apply etag caching logic based on version number
    io.set("log level", 1); // reduce logging
    io.set("transports", [
        "websocket",
        "xhr-polling",
        "jsonp-polling"
    ]);
});

require("asynquence-contrib");

httpserv.listen(port, host);


