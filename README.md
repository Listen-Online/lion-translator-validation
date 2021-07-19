# translator-validation

A lightweight framework for validation modified swagger files in lion-translator.

### Features
1. Build OAS validation rules easily with modular functions
1. Allows for custom code for generating rules in python

### Requirements

This package uses python-shell for customized functions. Make sure you pass the path to the python env
when calling the custom function.

### Installation

```
npm i translator-validation-oas
```

### Documentation

```
var rules= require('./rules.js')

rules.rules(OrignalSwaggerfile, translatedSwaggerFile, [,options])

```

OrignalSwaggerfile: Parent Swagger File (needed for checkJsonSchema)
translatedSwaggerFile: Modified Swagger File created after the user has modified the original files
[,options]: Json object or array of json objects

### Usage

```
const rules = require('translator-validation-oas');

let result = rules.rules('sample_oas.json', 'sample_translation.json', {
  "id": "Rule2",
  "functionName": "checkMatch",
  "path": "$.servers[*]",
  "ruledesc": "Check if server match Rule2",
  "fieldname": "url",
  "regexp": "[a-z]+",
  "level": "warn",
  "errmsg": "Expression does not seem to be a URL."
});

console.log(result);

```
### API Reference

Options documentation

Options is a json object.

Options | Type| Description
--------|-----|-------
functionName| String |Choose from functions below
ruledesc| String| Give a brief description of the rule
ruleid| id |Give a unique rule id
JsonPath|String| Look up JSon path documentation. This will determine the target object the function is applied to.
fieldname| String| Give the target field name that the function is applied to
level | String | Choose from warn, error,info
parameter| [key,value] | Add required parameters for the chosen function


functions documentation

functionName | required parameters
-------------|-----------
checkMatch|regexp
checkEnum| enumValues (seperated by ',')
checkUnique| fieldname
checkLength|maxsize,minsize
customFunction| code, pythonPath. Refer to [PythonShell](https://www.npmjs.com/package/python-shell) documentation
checkJsonSchema| parentSchema,childSchema
checkfieldExists|fieldname
checkfieldNotExists|fieldname
