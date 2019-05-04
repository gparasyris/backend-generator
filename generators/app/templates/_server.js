var express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  cors = require('cors'),
  { router } = require('./api/utilities'),
  responseHanlder = require('./api/middleware/responseHandler');

/* setting port */
var port = process.env.PORT || 5000;
// Initialize the modules
const modules = require('./api/modules');
mongoose.connect('mongodb://localhost/demo', { useNewUrlParser: true }); // connect to our database

app.use(cors());
app.use(router);
app.use(responseHanlder);


// port attached
app.listen(port);
console.log('Node JS server listening to port ' + port);