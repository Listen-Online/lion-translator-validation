//// TODO: Make loggerList global
var loggerList= [];
module.exports.returnHandler=  function(options) {
  err = {
    'Level':options.level,
    'Rule': options.ruledesc,
    'Message': options.errmsg,
    'JsonPath': options.path,
  };
  if (options.errPath)
  {
    err['ErrPath']=options.errPath;
  }
  loggerList.push(err);
}

module.exports.getResults= function(){
  return loggerList;
}
