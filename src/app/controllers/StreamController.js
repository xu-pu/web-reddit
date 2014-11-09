'use strict';

var Feed = require('../models/Feed.js');

module.exports = Ember.ObjectController.extend({

    order: '',

    after: Infinity,

    feeds: [],

    isLoading: function(){
        return this.get('requestID') !== null;
    }.property('requestID'),

    requestID: null,

    url: function(){
        return  'https://reddit.com/r/' + this.get('name') + '/' + this.get('order') + '.json';
    }.property('name', 'order'),

    onSwitchStream: function(){
        this.set('feeds', []);
        this.set('requestID', null);
    }.observes('name', 'order'),

    loadMore: function(){

        if (this.get('isLoading')) {
            return;
        }

        var _self = this;

        var params = {
            jsonp: 'jsonp',
            dataType: 'jsonp',
            type: 'GET'
        };

        if (this.get('after') < Infinity) {
            params.data = {
                after: this.get('after')
            };
        }

        var timestamp = (new Date()).getTime();

        this.set('requestID', timestamp);

        jQuery
            .ajax(_self.get('url'), params)
            .then(function(data){
                if (_self.get('requestID') === timestamp) {
                    var listing = data.data.children;
                    _self.pushObjects(listing.map(function(article){
                        return Feed.create(article.data);
                    }));
                    _self.set('requestID', null);
                }
            });

    },

    actions: {

    }

});