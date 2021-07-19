// Takes input function from the user
// https://github.com/json-path/JsonPath
fs = require('fs');
var jp = require('jsonpath');
var oasValidate = require('./oasValidation.js');
var basic = require('../utils/checkOptions.js');
var custom = require('../utils/customFunctions.js')


module.exports.parser = function(swaggerFile, newswaggerFile, options) {
  // return new Promise((resolve, reject) => {
    options.parentSchema  = JSON.parse(fs.readFileSync(swaggerFile));
    options.childSchema =  JSON.parse(fs.readFileSync(newswaggerFile));

    //Validate Swagger file
    var oasValid = oasValidate.oasValidate(options.parentSchema, {});
    var oasValidNew = oasValidate.oasValidate(options.childSchema, {});


    try {
    // if(!options.fieldname)
    // {
      options.targetobj =  jp.query(options.childSchema, options.path);
      options.targetpaths =  jp.paths(options.childSchema, options.path);
    // }else{
    //   options.targetobj =  jp.query(options.childSchema, options.path+"."+options.fieldname);
    //   options.targetpaths =  jp.paths(options.childSchema, options.path+"."+options.fieldname);
    // }
      var checkOptns = basic.checkOptions(options.functionName, options);

      if (checkOptns) // TODO: && oasValid && oasValidNew
      {
        checkOptns(options);
      }
    } catch {
      // TODO: Add to return log
      console.log("could not get json path");
    }
}
