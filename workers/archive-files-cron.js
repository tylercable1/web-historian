var archive = require('../helpers/archive-helpers.js');
var htmlFetcher = require('./htmlFetcher.js');

archive.readListOfUrls(null, htmlFetcher.archiveList);