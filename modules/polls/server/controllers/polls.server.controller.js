'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Poll = mongoose.model('Poll'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an poll
 */
exports.create = function (req, res) {
  var poll = new Poll(req.body);
  poll.user = req.user;

  poll.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(poll);
    }
  });
};

/**
 * Show the current poll
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var poll = req.poll ? req.poll.toJSON() : {};

  // Add a custom field to the Poll, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Poll model.
  poll.isCurrentUserOwner = !!(req.user && poll.user && poll.user._id.toString() === req.user._id.toString());

  poll.currentUser = req.user._id.toString();

  res.json(poll);
};

/**
 * Update an poll
 */
exports.update = function (req, res) {
  var poll = req.poll;

  poll.title = req.body.title;
  poll.content = req.body.content;

  poll.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(poll);
    }
  });
};

/**
 * Delete an poll
 */
exports.delete = function (req, res) {
  var poll = req.poll;

  poll.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(poll);
    }
  });
};

/**
 * List of Polls
 */
exports.list = function (req, res) {
  Poll.find().sort('-created').populate('user', 'displayName').exec(function (err, polls) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(polls);
    }
  });
};

/**
 * Poll middleware
 */
exports.pollByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Poll is invalid'
    });
  }

  Poll.findById(id).populate('user', 'displayName').exec(function (err, poll) {
    if (err) {
      return next(err);
    } else if (!poll) {
      return res.status(404).send({
        message: 'No poll with that identifier has been found'
      });
    }
    req.poll = poll;
    next();
  });
};
