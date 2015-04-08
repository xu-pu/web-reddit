'use strict';

var Listing = require('./Listing.js'),
    settings = require('../settings.js'),
    ORDERS = settings.SUBREDDIT_ORDERS;

module.exports = Ember.Object.extend({

    name: null,

    backend: null,

    order: ORDERS.HOT,

    listing: null,

    elements: Ember.computed.alias('listing.list'),

    isEnd: Ember.computed.alias('listing.isEnd'),

    isLoading: Ember.computed.alias('listing.isLoading'),

    url: function(){
        return  'https://reddit.com/r/' + this.get('name') + '/' + this.get('order') + '.json';
    }.property('name', 'order'),

    more: function(){
        this.get('listing').more();
    },

    onInit: function(){
        var listing = Listing.create(this.getProperties('url', 'backend'));
        this.set('listing', listing);
        listing.more();
    }.on('init')

});