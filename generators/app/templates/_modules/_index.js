/*
 *
 *  <%= nameAllCapitalPlural %> MODULE
 *
 */

var name = '<%= name %>';
exports.name = name;

var routes = require('./routes'),
  functions = require('./actions');
// mapper = require('./mapper');

exports.init = function (app, config) {
  routes.init(app, config);
  functions.init(app, config);
};
