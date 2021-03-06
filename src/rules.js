var parser = require('./parser.js');
var returnhandle = require('../utils/returnHandler.js');
let Promise = require('bluebird');
var oasValidate = require('./oasValidation.js');
var custom = require('../utils/customFunction.js');

// function to run custom rules
function custom_array_call(swaggerFile,
  newswaggerFile, custom_array) {

  var Promisearray = [];
  Promisearray.length = custom_array.length;

  for (i = 0; i < custom_array.length; i++) {
    // collect promise objects from all custom functions
    Promisearray[i] = custom.checkCustomFunction(swaggerFile,
      newswaggerFile,
      custom_array[i]);
  }

  // Promise.all waits for all custom functions to finish
  return new Promise.all(Promisearray)
    .then((values) => {
      console.log(values);
    });
}

// main function
module.exports.rules = function(swaggerFile, newswaggerFile, jsonItr) {
  custom_array = [];
  non_custom_array = [];
  returnhandle.initializeLoggerList();

  // validate both schemas
  var oasValid = oasValidate.oasValidate(swaggerFile, {});
  var oasValidNew = oasValidate.oasValidate(newswaggerFile, {});

  // Add check to confirm if OAS validation was successful otherwise don't continue with rule checks

  // Iterate through rule objects array and seperate them into custom and reusable functions.
  // Reusable function implementation is synchronous whereas custom function is asynchronous
  // so we seperate the two rules and execute it one after the other

  if (jsonItr instanceof Array) {
    for (i = 0; i < jsonItr.length; i++) {
      if (jsonItr[i].functionName != 'checkCustomFunction') {
        non_custom_array.push(jsonItr[i]);
      } else {
        custom_array.push(jsonItr[i]);
      }
    }
  }

  // console.log("Custom Array,", custom_array);
  // console.log("Genric functions array", non_custom_array);

  // Iterate through reusable functions and invoke the call
  for (i = 0; i < non_custom_array.length; i++) {
    var successcode = parser.parser(swaggerFile,
      newswaggerFile,
      non_custom_array[i]);
  }

  // call custom array functions asynchronous

  // return Promise object to the caller function
  return new Promise((resolve, reject) => {
    custom_array_call(swaggerFile,
        newswaggerFile, custom_array)
      .then(results => console.log("Completed Custom Functions", results))
      .then(results => resolve(returnhandle.getResults()));

  });
}
