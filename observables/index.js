var express = require("express");
var app = express();
var fs = require("fs");
var {Observable, interval, of} = require("rxjs");
var Rx = require("rx");
var {map, filter, scan, switchMap } = require("rxjs/operators");

var myObservable;
var ofObservable;
var pipeData;

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

app.get("/setup", (req, res, next) => 
{
    myObservable = Rx.Observable.create((subscriber) => 
    {
        var index = 1;
        //const {next, error} = subscriber;
        let msg;
        msg = setInterval(() => {
            subscriber.next('hello world: ' + index++ + "\n");
        }, 1000);
    });
    res.status(200).send("Event processor created...");
    return res.end();
});

app.get("/pipe-example", (req, res, next) => 
{
    pipeData = interval(1000)
        .pipe(
            filter(x => x % 2 === 0),
            map(x => x + x),
            scan((acc, x) => acc + x));
    res.status(200).send("Pipe processor created...");
    return res.end();
});

app.get("/of-example", (req, res, next) => 
{
    const data = of(0, 1, 2, 3, 4);

    ofObservable = data.pipe( filter( x => x % 2 === 1) );
    
    res.status(200).send("Of processor created...");
    return res.end();
});

app.get("/listen", (req, res, next) => 
{
    myObservable.subscribe( (next) => {
        process.stdout.write(next); 
    },
                            (error) => {process.stdout.write(error); },
                            () => {process.stdout.write("Completed"); },);
    return res.end();
});

app.get("/pipe-listen", (req, res, next) => 
{
    pipeData.subscribe( (x) => {process.stdout.write("pipe: " + x + "\n"); },
                        (error) => {process.stdout.write(error); },
                        () => {process.stdout.write("Completed"); },);
    return res.end();
});

app.get("/of-listen", (req, res, next) => 
{
    ofObservable.subscribe( (x) => {process.stdout.write("of: " + x + "\n"); },
                        (error) => {process.stdout.write(error); },
                        () => {process.stdout.write("Completed"); },);
    return res.end();
});

// visit https://www.tektutorialshub.com/angular/using-switchmap-in-angular/ for the code below
app.get("/switchMap-example-1", (req, res, next) => 
{
    const srcObservable= of(1,2,3,4)
    const innerObservable= of('A','B','C','D')
     
    srcObservable.pipe(
      switchMap( val => {
        console.log('Source value '+val)
        console.log('starting new observable')
        return innerObservable
      })
    ).subscribe(ret=> {
        console.log('Recd ' + ret);
    })
    return res.end();
});

