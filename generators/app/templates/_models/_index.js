const requireDir = require('require-dir');
const dir = requireDir('.', {
  mapKey: function(value, baseName) {
    return typeof value === 'string' ? `${capitalizeFirstLetter(value)}Model` : `${capitalizeFirstLetter(baseName)}Model`;
  }
});

module.exports = dir;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}