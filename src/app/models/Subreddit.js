'use strict';

var settings = require('../settings.js'),
    ORDERS = settings.SUBREDDIT_ORDERS;

module.exports = Ember.Object.extend({

    name: null,

    order: ORDERS.HOT

});