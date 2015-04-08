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

    isLoading: false,

    url: function(){
        return  'https://reddit.com/r/' + this.get('name') + '/' + this.get('order') + '.json';
    }.property('name', 'order'),

    more: function(){

        var backend = this.get('backend'),
            params = {},
            _self = this;

        if (this.get('listing.isEnd')) { return; }
        else if (this.get('listing.isEmpty')) {
            console.log('no offset');
        }
        else { params.after = this.get('listing.after'); }

        this.set('isLoading', true);
        backend
            .ajax(this.get('url'), params)
            .then(function(data){
                _self.set('isLoading', false);
                _self.get('listing').appendFromJson(data.data);
            },function(){
                _self.set('isLoading', false);
            });

    },

    onInit: function(){
        this.set('listing', Listing.create());
        this.more();
    }.on('init')

});