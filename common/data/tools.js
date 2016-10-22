yaml = require('js-yaml');
fs   = require('fs');
path = require('path');

exports.data = function() {
  var data = []
  
  // get data path
  var dataPath = path.join(__dirname, '_tools-raw.yml')
  var toolsPath = path.join(__dirname, '../..', 'tools')

  try {
    data = yaml.safeLoad(fs.readFileSync(dataPath, 'utf8'))
    for(var i = 0; i < data.length; i++) {
      var toolItem = data[i]
      toolItem.icon = path.join(toolsPath, toolItem.path, 'assets', toolItem.icon)
      if(path.parse(toolItem.icon).ext === '.svg') {
        toolItem.icon = fs.readFileSync(toolItem.icon, 'utf8')
      }

      toolItem.url = ('/' + toolItem.path).replace(/\\/g, '/')
    }
  } catch (e) {
    console.log(e);
  }
  return data
}