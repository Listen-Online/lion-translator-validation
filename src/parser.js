// Takes input function from the user
// https://github.com/json-path/JsonPath
// const fs = require('fs');
var jp = require('jsonpath');
var basic = require('../utils/checkOptions.js');


module.exports.parser = function(swaggerFile, newswaggerFile, options) {
  // return new Promise((resolve, reject) => {
    options.parentSchema  = swaggerFile;
    options.childSchema =  newswaggerFile;

    //Validate Swagger file

    options.targetobj =  jp.query(options.childSchema, options.path);
    options.targetpaths =  jp.paths(options.childSchema, options.path);

    var checkOptns = basic.checkOptions(options.functionName, options);

    // check if arg requirements for function satisfies, then run the function
    if (checkOptns)
    {
      // checkOptn contains the function, so below we just call it
      checkOptns(options);
    }
    else {
      console.log("Could not run rule: insufficient args");
    }

    return;
}
