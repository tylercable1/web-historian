var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var request = require('request');
var htmlFetcher = require('./../workers/htmlfetcher.js');
// require more modules/folders here!

let parseFormEncoding = function (string) {
  let spacedString = string.replace('%2520', ' ');
  spacedString = spacedString.replace('+', ' ');
  let keyPairs = spacedString.split('&').map(keyPair => keyPair.split('='));
  let message = {};
  keyPairs.forEach(keyPair => message[keyPair[0]] = keyPair[1]);
  return message;
};

exports.handleRequest = function (req, res) {
  let fileToServe;

  let body = '';
  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    var message = parseFormEncoding(body);
    // console.log(message);
    httpHelpers.serveAssets(res, 'index');
    if ('url' in message) {
      archive.isUrlArchived(message.url);
    } else {
      fileToServe = 'index';

    }

  });

  

  // res.end(archive.paths.list);

  

};

//HTML page sends post request
//When index.html is to client, it sends back two more requests for css and favicon
//Needs to handle GET vs. POST requests as well as different url's.

