const async_hooks = require("async_hooks");
const express = require("express");
const app = express();
const fs = require("fs");
const util = require('util');

function debug(...args) {
  // Use a function like this one when debugging inside an AsyncHooks callback
  fs.writeFileSync('log.out', `${util.format(...args)}\n`, { flag: 'a' });
}


const _P = "<p></p>";

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

// Return the ID of the current execution context.
const eid = async_hooks.executionAsyncId();

// Return the ID of the handle responsible for triggering the callback of the
// current execution scope to call.
const tid = async_hooks.triggerAsyncId();
const tid2 = async_hooks.triggerAsyncId();

// Create a new AsyncHook instance. All of these callbacks are optional.
const asyncHook = async_hooks.createHook({ init, before, after, destroy, promiseResolve });

// Allow callbacks of this AsyncHook instance to call. This is not an implicit
// action after running the constructor, and must be explicitly run to begin
// executing callbacks.
asyncHook.enable();

//
// The following are the callbacks that can be passed to createHook().
//
var _asyncId;
var _type; 
var _triggerAsyncId; 
var _resource;

// init is called during object construction. The resource may not have
// completed construction when this callback runs, therefore all fields of the
// resource referenced by "asyncId" may not have been populated.
function init(asyncId, type, triggerAsyncId, resource) {
    _asyncId = asyncId;
    _type = type;
    _triggerAsyncId = triggerAsyncId;
    _resource = resource;

    debug( asyncId, type, triggerAsyncId, resource );
 }

// Before is called just before the resource's callback is called. It can be
// called 0-N times for handles (e.g. TCPWrap), and will be called exactly 1
// time for requests (e.g. FSReqCallback).
function before(asyncId) {
    //process.stdout.write("before.asyncId: " + asyncId + "\n");
 }

// After is called just after the resource's callback has finished.
function after(asyncId) { 
    //process.stdout.write("after.asyncId: " + asyncId + "\n");
}

// Destroy is called when an AsyncWrap instance is destroyed.
function destroy(asyncId) { 
    process.stdout.write("destroy.asyncId: " + asyncId + "\n");
}

// promiseResolve is called only for promise resources, when the
// `resolve` function passed to the `Promise` constructor is invoked
// (either directly or through other means of resolving a promise).
function promiseResolve(asyncId) { 
    process.stdout.write("promiseResolve.asyncId: " + asyncId + "\n");
}

app.route("/hook-info")
    .get(function(req, res, next)
    {
        res.writeHead(200, {'Content-Type': 'text/html'});  // When using res.write() you must send the header options
        process.stdout.write("Test\n");     // this writes out to the terminal where you ran the program from
        res.write("HOOK INFO" + _P);     // this writes back to the client browser but does send http header

        res.write("executionAsyncId: " + eid + _P);

        res.write("triggerAsyncId: " + tid + _P);

        res.write( "asyncId:" + _asyncId 
                 + " / type:" + _type 
                 + " / triggerAsyncId:" + _triggerAsyncId
                 + " / resource:" + _resource);
        
        return res.end();    
    });

app.route("/timeout")
    .get(function(req, res, next )
    {
        //clearTimeout(setTimeout(() => {}, 10));
        res.send("TIMEOUT CALLED");
    });
