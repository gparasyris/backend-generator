/**
 * FUNCTIONS FOR MODULE <%= nameAllCapitalPlural %>
 */


const { <%= nameFirstCapital %>Model } = require('../../models');
const { demoResponse } = require('../../utilities/demo');

const create = (req, res, next) => {
  // assert payload
  // if(!req.body`.hasOwnProperty('requiredField')){
  let payload = req.body; // name, title, description etc.
  // res.locals.data = demoResponse;
  <%= nameFirstCapital %>Model.create(payload, (error, data) => {
    if (error) next(error);
    else {
      res.status(201);
      res.locals.data = data;
      next();
    }
  });
  // } else {
  //   next('Invalid Arguments'); //This error needs handling
  // }
}

const retrieve = (req, res, next) => {
  if (req.params.hasOwnProperty('<%= name %>Id')) {
    <%= nameFirstCapital %>Model.findById(req.params.<%= name %>Id, (error, data) => {
    if (error) next(error);
    else if (!data) {
      res.status(404);
      res.locals.data = false;
      next();
    }
    else {
      res.status(200);
      res.locals.data = data;
      next();
    }
  });

  }
  else {
    <%= nameFirstCapital %>Model
      .find()
      .lean()
      .exec((error, data) => {
        if (error) next(error);
        else if (data.length === 0) {
          res.status(200);
          res.locals.data = [];
          next();
        }
        else {
          res.status(200);
          res.locals.data = data;
          next();
        }
      });
  }
}

const update = (req, res, next) => {
  if (req.body) {
    <%= nameFirstCapital %>Model.findById(req.params.<%= name %>Id, (error, data) => {
    if (error) next(error);
    else if (!data) {
      res.status(404);
      res.locals.data = false;
      next();
    }
    else {
      let payload = {};

      // check which fields exist and if certain conditions that you 
      // want to apply are satisfied, e.g.:
      // if (req.body.hasOwnProperty('name')) payload.name = req.body.name;
      // if (req.body.hasOwnProperty('description')) payload.description = req.body.description;


      <%= nameFirstCapital %>Model.update(payload, (error, raw) => {
        if (error) next(error);
        else if (!raw.nModified) {
          res.locals.data = data
          next();
        } else {
          <%= nameFirstCapital %>Model.findById(req.params.<%= name %>Id, (error, item) => {
            if (error) next(error);
            else if (!item) {
              // something different here for sure
              res.status(404);
              res.locals.data = false;
              next();
            }
            else {
              res.status(200);
              res.locals.data = item;
              next();
            }
          });
        }
      });
    }
  });
  } else {
    next('Invalid Arguments');
  }
}


const _delete = (req, res, next) => {
  <%= nameFirstCapital %>Model.findById(req.params.<%= name %>Id, (error, data) => {
  if (error) next(error);
  else if (!data) {
    res.status(404);
    res.locals.data = false;
    next();
  }
  else {
    data.delete((error, deleted) => {
    if (error) next(error);
    else {
      res.status(200);
      res.locals.data = deleted;
      next();
    }
  });
  }
});
}

module.exports = {
  create,
  retrieve,
  update,
  delete: _delete
};