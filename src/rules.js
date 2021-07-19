var parser = require('./parser.js');
var returnhandle = require('../utils/returnHandler.js');
// Entry point
module.exports.rules=function (swaggerFile, newswaggerFile, jsonItr) {
  if (jsonItr instanceof Array) {
    for (i = 0; i < jsonItr.length; i++) {
      parser.parser(swaggerFile,
        newswaggerFile,
        jsonItr);
    }
  } else {
    parser.parser(swaggerFile,
      newswaggerFile,
      jsonItr);
  }
  return returnhandle.getResults();
}
