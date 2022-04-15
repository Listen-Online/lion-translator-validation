const validator = require('oas-validator-lxwang2');
const options = {};
var returnhandle = require('../utils/returnHandler.js');
let pass=1;
let fail=0;

// initial OAS validation check
module.exports.oasValidate = function(openapi, options) {

  validator.validate(openapi, options)
    .then(function(options) {
      return pass;
    })
    .catch(function(err) {
      if (options.context) returnhandle.returnHandler({
        "ruledesc": "OAS Validation",
        'errmsg': "Incorrect Swagger schema",
        'path': options.context.pop(),
        'level': 'warn',
        'errPath': 'OASfileError'
      });
      return fail;
    });
}
