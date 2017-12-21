var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
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
    console.log(parseFormEncoding(body));
    var message = parseFormEncoding(body);
    if ('url' in message) {
      archive.isUrlInList(message.url);
    } else {
      fileToServe = 'index';
    }

  });

  
  httpHelpers.serveAssets(res, fileToServe);
  // res.end(archive.paths.list);
};

