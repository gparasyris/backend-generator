/*
 *  <%= name %>Model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const <%= name %>Schema  = new Schema({
  type: {
    type: String,
    required: true,
    default: '<%= name %>'
  },
});

module.exports = mongoose.model('<%= plural %>', <%= name %>Schema);
