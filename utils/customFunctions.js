let {
  PythonShell
} = require('python-shell');
var fs = require('fs');
const compile = require('compile-template')

module.exports.customFunction = function (options) {
  //Create Python Script, add template here that accepts arguments
  var success=1;
  var fail=0
  var target=JSON.stringify(options.childSchema);
  const template = compile(fs.readFileSync('../customTemplate.py', 'utf8'));
  const codeSrc=fs.readFileSync(options.code, 'utf8');
  const scriptFuncTemp = template({funcname:options.customFunctionName,
                          code:codeSrc,
                          targetobj: target});

  // const template = compile('foo=${value}')
  // const string = template({value: 1})
  //Run Python script
  let optionsPy = {
    mode: 'text',
    pythonPath: options.pythonPath,
    pythonOptions: ['-u'], // get print results in real-time
    // scriptPath: 'path/to/my/scripts',
    // args: options.targetobj
  };

  // TODO: PythonShell.checkSyntax(scriptFuncTemp);
  console.log(codeSrc);
  PythonShell.runString(scriptFuncTemp, optionsPy, function(err, results) {
    if (err) throw err;
    if (results!=null) console.log('finished',results);
    else {
      console.log("Could not run code");
    }
  });
}
