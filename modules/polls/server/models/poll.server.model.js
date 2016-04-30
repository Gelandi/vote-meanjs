'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * PollOption Schema
 */
var PollOptionSchema = new Schema({
  optionText: {
    type: String,
    default: 'Poll Option default',
    required: 'Enter a votable optionoin',
    trim: true
  },
  optionScore : {
    type: Number,
    default: 0
  }
});

/**
 * Poll Schema
 */
var PollSchema = new Schema({
  question: {
    type: String,
    default: '',
    required: 'Please enter poll question',
    trim: true
  },
  optionsArray: {
    type: [PollOptionSchema],
    default: [PollOptionSchema,PollOptionSchema]
  },
  option1: {
    type: String,
    default: '',
    required: 'Please enter a poll option',
    trim: true
  },
  option1_score: {
    type: Number,
    default: 0
  },
  option2: {
    type: String,
    default: '',
    required: 'Please enter a poll option',
    trim: true
  },
  option2_score: {
    type: Number,
    default: 0
  },  
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  votes: {
    type: [Schema.ObjectId],
    default: []
  }
});

mongoose.model('PollOption', PollOptionSchema);
mongoose.model('Poll', PollSchema);
