"use strict";

var Listing = require('../models/Listing.js');

module.exports = Ember.Controller.extend({

    backend: Ember.inject.service(),

    subscribed: function(){
        return Listing.create({
            backend: this.get('backend'),
            url: '/subreddits/mine/subscriber'
        });
    }.property()

});