const validator = require('oas-validator-lxwang2');
const options = {};
var returnhandle = require('../utils/returnHandler.js');
let pass=1;
let fail=0;
module.exports.oasValidate = function(openapi, options) {

  validator.validate(openapi, options)
    .then(function(options) {
      console.log("OAS file is", oas.valid);
      return pass;
    })
    .catch(function(err) {
      if (options.context) returnhandle.returnHandler({
        "ruledesc": "OAS Validation",
        'errmsg': err.message,
        'path': options.context.pop(),
        'level': 'warn'
      });
      return fail;
    });
}
