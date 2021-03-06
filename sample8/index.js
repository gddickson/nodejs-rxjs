var express = require("express");
var app = express();
var fs = require("fs");
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var mongo_url = 'mongodb://localhost:27017';


const HTML_P = '<p></p>';
const COLLECTION_NAME = 'celestial_employees';


var dbo = null;
var cursor = null;

MongoClient.connect(mongo_url, function(err, db) {

    dbo = db.db("testdb");
    cursor = dbo.collection('celestial_employees').find();

    console.log("CONNECTED TO DB");
});

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

// this is the new way of setting up routes
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

app.get("/list-all-customers", (req, res, next) =>
{    
    cursor = dbo.collection(COLLECTION_NAME).find();

    res.writeHead(200, {'Content-Type': 'text/html'});

    cursor.each(function(err, doc)
    {
        if( doc !== null)
        {
            sent = true;
            res.write(JSON.stringify(doc) );
            console.log(doc);
            console.log("===================================================================");
        }
        else
            res.end();
    });
});

app.get("/list-customers/by/:id", (req, res, next) =>
{    
    var p_id = req.params.id;
    var query = {"_id": p_id};
    cursor = dbo.collection(COLLECTION_NAME).find( query );

    res.writeHead(200, {'Content-Type': 'text/html'});

    cursor.each(function(err, doc)
    {
        if( doc !== null)
        {
            sent = true;
            res.write(JSON.stringify(doc) );
            console.log(doc);
            console.log("===================================================================");
        }
        else
            res.end();
    });
});

app.get("/list-customers/", (req, res, next) =>
{    
    var q = url.parse(req.url, true);
    var p_id = q.query.cid;
    var query = {"_id": p_id};
    cursor = dbo.collection(COLLECTION_NAME).find( query );

    res.writeHead(200, {'Content-Type': 'text/html'});

    cursor.each(function(err, doc)
    {
        if( doc !== null)
        {
            sent = true;
            res.write(JSON.stringify(doc) );
            console.log(doc);
            console.log("===================================================================");
        }
        else
            res.end();
    });
});

