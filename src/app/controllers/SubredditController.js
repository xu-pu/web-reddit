'use strict';

var settings = require('../settings.js'),
    ORDERS = settings.SUBREDDIT_ORDERS;

module.exports = Ember.ObjectController.extend({

    needs: ['stream'],

    queryParams: ['order'],

    order: ORDERS.HOT

});