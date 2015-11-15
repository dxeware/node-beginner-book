//Setting up module to be called by index.js

var http = require('http');
var url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
  	var postData = '';
  	var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding('utf8');

    request.addListener('data', function(postDataChunk) {
    	postData += postDataChunk;
    	console.log('Received POST data chunk \'' + postDataChunk + '\'.');
    });

    request.addListener('end', function() {
    	route(handle, pathname, response, postData);
    });

    // response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.write('Hello world!');
    // response.end();
  }

  http.createServer(onRequest).listen(8088);
  console.log("Server has started.");
}

//Using exports instead of module.exports
// Need to read more about this, but they
// do the same thing
module.exports = start;

