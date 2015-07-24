function handleHTTP(req,res){
    if(req.method === "GET"){
        if(req.url === "/"){
            res.writeHead(200,{
               "Content-type":"text/html"
            });
            res.end("Hello World "+Math.random());
        }
        else{
            res.writeHead(404);
            res.end("Can't find it")
        }
    }
    else{
        res.writeHead(403);
        res.end("No, no, don't do that!");
    }
}

var host = "localhost";
var port = 8006;

var http = require("http");
var http_serv = http.createServer(handleHTTP).listen(port,host);



