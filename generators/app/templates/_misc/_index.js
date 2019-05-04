/**
 * General Index file importing all sibling files and
 * exporting them based on name.
 */

const requireDir = require('require-dir');
const dir = requireDir('./', { recurse: true });
module.exports = dir;