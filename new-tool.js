var fs = require('fs')
var path = require('path')
require('shelljs/global');

// verbose shelljs
config.verbose = true;

// get root path
var rootPath = path.join(__dirname, 'root')
var toolsName = process.argv[2]

if(!toolsName || toolsName.length == 0) {
  console.log('Error: Please specify a tool name to bootstrap files');
  exit();
}

var toolPath = path.join(__dirname, 'tools', toolsName)
console.log('Attempting to bootstrap files at: ' + toolPath)

if (fs.existsSync(toolPath)) {
  console.log('Error: Tool already exist at: ' + toolPath);
  exit();
}