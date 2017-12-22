var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require('../web/http-helpers.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

let paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

exports.paths = paths;

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


let readListOfUrls = function(url, callback) {
  fs.readFile(paths.list, function(err, data) {
    if (err) {
      console.log('Error!: ', err);
      throw err;
    }
    var dataArray = data.toString('utf8').split(' ');
    
    dataArray.pop();
    //calls isUrlInList
    callback(url, dataArray);
    return dataArray;
  });

};

let addUrlToList = function(url, callback) {
  fs.appendFile(paths.list, url + ' ', (err) => {
    if (err) {
      throw err;
    }
  });
};

let isUrlInList = function(url, dataArray) {
  if (!dataArray.includes(url)) {
    addUrlToList(url);
  }
};

let isUrlArchived = function(url, callback, res) {
  fs.readdir(paths.archivedSites, function(err, files) {
    if (files.includes(url + '.html')) {
      httpHelpers.serveAssets(res, `${paths.archivedSites}/${url}.html`);
    } else {
      readListOfUrls(url, isUrlInList);
      httpHelpers.serveAssets(res, paths.siteAssets + '/loading.html');
    }
  });  
};

let downloadUrls = function(urls) {
};

exports.readListOfUrls = readListOfUrls;
exports.isUrlInList = isUrlInList;
exports.addUrlToList = addUrlToList;
exports.isUrlArchived = isUrlArchived;
exports.downloadUrls = downloadUrls;
