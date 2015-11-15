//Setting up module to be called by index.js

var http = require('http');
var url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
  	var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
   	route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8088);
  console.log("Server has started.");
}

//Using exports instead of module.exports
// Need to read more about this, but they
// do the same thing
module.exports = start;

