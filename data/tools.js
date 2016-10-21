yaml = require('js-yaml');
fs   = require('fs');
path = require('path');

exports.data = function() {
  var data = []
  try {
    data = yaml.safeLoad(fs.readFileSync('data/_tools-raw.yml', 'utf8'))
    for(var i = 0; i < data.length; i++) {
      var toolItem = data[i]
      toolItem.icon = path.join(toolItem.path, 'assets', toolItem.icon)
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