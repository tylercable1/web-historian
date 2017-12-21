var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

let headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.parseBuffer = function() {};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  let fileToServe;

  
  fs.readFile(fileToServe = __dirname + "/public/index.html", function(err, data) {
    if (err) {
      console.log('Error: ', err);
      throw err;
    }
    res.writeHead(200, headers);
    res.write(data);
    res.end();
    
 
  });

};

exports.headers = headers;

// As you progress, keep thinking about what helper functions you can put here!
