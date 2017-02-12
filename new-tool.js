var fs = require('fs')
var path = require('path')
require('shelljs/global');

// verbose shelljs
config.verbose = true;

// get root path
var rootPath = path.join(__dirname, 'root')
var toolName = process.argv[2]

if(!toolName || toolName.length == 0) {
  console.log('Error: Please specify a tool name to bootstrap files');
  exit();
}

var toolPath = path.join(__dirname, 'tools', toolName)
console.log('Attempting to bootstrap files at: ' + toolPath)

if (fs.existsSync(toolPath)) {
  console.log('Error: Tool already exist at: ' + toolPath);
  exit();
}

// directory does not exist. Create directory and bootstrap files
mkdir(toolPath)
mkdir(path.join(toolPath, 'assets'))
touch(path.join(toolPath, 'assets', 'icon.svg'))

mkdir(path.join(toolPath, 'scripts'))
touch(path.join(toolPath, 'scripts', toolName + '.js'))

mkdir(path.join(toolPath, 'styles'))
touch(path.join(toolPath, 'styles', toolName + '.scss'))


mkdir(path.join(toolPath, 'html'))
var htmlPath = path.join(toolPath, 'html', toolName + '.pug')
var htmlContent = "---\n\
title: 'TITLE'\n\
description: 'DESCRIPTION'\n\
layout: 'tools'\n\
styles:\n\
  - 'styles/" + toolName + ".css'\n\
scripts:\n\
  - 'scripts/" + toolName + ".js'\n\
---"

fs.writeFile(htmlPath, htmlContent, function (err) {
  if (err) return console.log(err);
  console.log(htmlPath + ' written..');
});

var mmpilotConfigPath = path.join(toolPath, '_mmpilot.yml')
var mmpilotConfig = "clean: ['../../public/" + toolName + "']\n\
\n\
includes: '../../common/_includes'\n\
layouts: '../../common/_layouts'\n\
out: '.'\n\
html:\n\
  dest: '../../public'\n\
  sitemap: ''\n\
\n\
assets:\n\
  dest: '../../public/" + toolName + "'\n\
\n\
styles:\n\
  dest: '../../public/" + toolName + "/styles'\n\
\n\
scripts:\n\
  dest: '../../public/" + toolName + "/scripts'\n\
\n\
data: '../../common/data'\n\
\n\
## additional data for site available as site.{key} in pug templates\n\
site:\n\
  url: 'https://tools.superdevresources.com'\n\
  title: SDR Tools\n\
  icon: sdr-logo\n\
  analytics: 'UA-37350394-3'\n\
\n\
## overrides when built with -d or --development option\n\
development:\n\
  site:\n\
    url: 'http://localhost:3000'\n\
    analytics: ''\n\
"

fs.writeFile(mmpilotConfigPath, mmpilotConfig, function (err) {
  if (err) return console.log(err);
  console.log(htmlPath + ' written..');
});