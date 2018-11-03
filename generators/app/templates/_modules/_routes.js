/*
 * ROUTES FOR MODULE <%= nameAllCapitalPlural %>
 */

exports.init = function (app, config) {
  app.post('/<%= name %>', create<%= nameFirstCapital %>);
  app.get('/<%= name %>/:<%= name %>Id', get<%= nameFirstCapital %>);
  app.get('/<%= name %>s', get<%= nameCapitalPural %>);
  app.put('/<%= name %>/:<%= name %>Id', update<%= nameFirstCapital %>);
  app.patch('/<%= name %>/:<%= name %>Id', patch<%= nameFirstCapital %>);
  app.delete('/<%= name %>/:<%= name %>Id', delete<%= nameFirstCapital %>);
}

var module_name = require("./index").name;