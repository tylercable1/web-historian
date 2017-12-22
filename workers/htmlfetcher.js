// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');


var getHtmlBody = function(url, callback) {
  request('http://' + url, function (error, response, body) {
    if (error) {
      console.log(error);
      console.log('url: ', url);
      throw error;
    } else {
      callback(url, body);
    }
  });
};

var writeToArchive = function(url, body) {
  //
  console.log(`${archive.paths.archivedSites}/${url}.html`);
  fs.writeFile(`${archive.paths.archivedSites}/${url}.html`, body, (err) => {
    
    if (err) {
      throw err;
    }
  });
};

var archiveList = function(url, dataArray) {
  dataArray.forEach(function(url) {
    getHtmlBody(url, writeToArchive);
  });
  fs.truncate(archive.paths.list, 0, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
};

exports.getHtmlBody = getHtmlBody;
exports.writeToArchive = writeToArchive;
exports.archiveList = archiveList;