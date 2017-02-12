var fs = require('fs')
var path = require('path')
require('shelljs/global');


// verbose shelljs
config.verbose = true;

// get root path
var rootPath = path.join(__dirname, 'root')

var command = process.argv[2]
var async = (command === 'watch')
if(process.argv.length >= 4) command += (' ' + process.argv[3]) //options such as -d


exec('mmpilot ' + command, {async: async})

if(command.startsWith('build') || command.startsWith('watch')) {
    // clean, serve and deploy commands on root is enough

    // get tools path
    var toolsPath =path.join(__dirname, 'tools')

    fs.readdirSync(toolsPath)
      .forEach(function (tool) {
        var toolPath = path.join(toolsPath, tool)
        if (fs.lstatSync(toolPath).isDirectory()) {
          console.log(' ')
          console.log('---')
          console.log(' ')
          console.log('Processing: ' + toolPath)
      
          // ensure path has _mmpilot.yml
          if (!fs.existsSync(path.join(toolPath, '_mmpilot.yml'))) {
            console.log('_mmpilot.yml not found in ' + toolPath)
            return
          }
      
          // run command in folder
          cd(toolPath);
          exec('mmpilot ' + command, {async: async})
        }
      })
}