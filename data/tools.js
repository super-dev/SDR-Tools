yaml = require('js-yaml');
fs   = require('fs');

exports.data = function() {
  var data = []
  try {
    data = yaml.safeLoad(fs.readFileSync('data/_tools-raw.yml', 'utf8'));
    console.log(data);
  } catch (e) {
    console.log(e);
  }
  return data
}