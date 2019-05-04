/**
 * ROUTES FOR MODULE <%= nameAllCapitalPlural %>
 */
const { router } = require('../../utilities');
const <%= name %>Functions = require('./functions');

const create<%= nameFirstCapital %> =[
  function (req, res, next) {
    <%= name %>Functions.create(req, res, next);
  }
];

const retrieve<%= nameFirstCapital %> =[
  function (req, res, next) {
    <%= name %>Functions.retrieve(req, res, next);
  }
];


const update<%= nameFirstCapital %> =[
  function (req, res, next) {
    <%= name %>Functions.update(req, res, next);
  }
];

const delete<%= nameFirstCapital %> =[
  function (req, res, next) {
    <%= name %>Functions.delete(req, res, next);
  }
];

router.post('/<%= name %>', create<%= nameFirstCapital %>);
router.get('/<%= name %>/:<%= name %>Id', retrieve<%= nameFirstCapital %>);
router.get('/<%= plural %>', retrieve<%= nameFirstCapital %>);
router.put('/<%= name %>/:<%= name %>Id', update<%= nameFirstCapital %>);
router.delete('/<%= name %>/:<%= name %>Id', delete<%= nameFirstCapital %>);
