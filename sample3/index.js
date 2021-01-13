var express = require("express");
var app = express();
var fs = require("fs");

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

// this is the old way of setting up routes
app.get("/", (req, res, next) => 
{
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
});

// this is the old way of setting up routes
app.get("/sayhello", (req, res, next) => 
{
    res.send("Hello World");     // no need to set content type, res.send() works out type from args passed in and sends header
    return res.end();
});

// this is the old way of setting up routes
app.get("/sayhello-with-status", (req, res, next) => 
{
    // if you uncomment the line below, you will get the error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
    // this is because the second send() is also setting the header, so it is being set twice before the end() call
    //res.status(200).send("Selvyn says - ");
    res.status(404).send("Hello World with status");    // no need to set content type, res.send() works out type from args passed in and sends header
    return res.end();
});

// the express way of setting up routes
app.route("/users")
    .get(function(req, res, next)
    {
        res.writeHead(200, {'Content-Type': 'text/html'});  // When using res.write() you must send the header options
        process.stdout.write("Test\n");     // this writes out to the terminal where you ran the program from
        res.write("Listing all users");     // this writes back to the client browser but does send http header
        return res.end();    
    });
    