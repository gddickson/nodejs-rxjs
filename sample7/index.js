var express = require("express");
var app = express();
var fs = require("fs");
var url = require('url');

const HTML_P = '<p></p>';


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
app.get("/setdt", (req, res, next) => 
{
    var q = url.parse(req.url, true);
    var text = q.query.year + " " + q.query.month;
    process.stdout.write(text + "\n");
    res.send(text + HTML_P);     
    return res.end();
});

// this is the old way of setting up routes
app.get("/setdt-new", (req, res, next) => 
{
    var q = new URL(req.url, "http://" + req.headers.host);

    var params = q.searchParams;

    var text = params.get("year") + " " + params.get("month");

    process.stdout.write(text + "\n");
    res.send(text + HTML_P);     
    return res.end();
});


app.get("/setdt/with/year/:yr/month/:mth", (req, res, next) => 
{
    var text = req.params.yr + " " + req.params.mth;

    process.stdout.write("Version 1: " + text + "\n");
    res.send("Version 1: " + text + HTML_P);     
    return res.end();
});

app.get("/setdt/with/month/:mth/year/:yr", (req, res, next) => 
{
    var text = req.params.yr + " " + req.params.mth;

    process.stdout.write("Version 2: " + text + "\n");
    res.send("Version 2: " + text + HTML_P);     
    return res.end();
});




