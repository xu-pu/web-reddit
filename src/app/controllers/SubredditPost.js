'use strict';

var _ = require('underscore');

var utils = require('../utils.js');

module.exports = Ember.Controller.extend({

    needs: ['subreddit'],

    subreddit: Ember.computed.alias('controllers.subreddit.subreddit'),

    backend: Ember.inject.service()

});