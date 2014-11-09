'use strict';

var Feed = require('../models/Feed.js');

module.exports = Ember.ObjectController.extend({

    needs: 'feeds',

    order: '',

    after: null,

    requestID: null,

    feeds: Ember.computed.alias('controllers.feeds.model'),

    isLoading: function(){
        return this.get('requestID') !== null;
    }.property('requestID'),

    url: function(){
        return  'https://reddit.com/r/' + this.get('name') + '/' + this.get('order') + '.json';
    }.property('name', 'order'),

    onSwitchStream: function(){
        this.get('feeds').clear();
        this.setProperties({
            requestID: null,
            after: null
        });
    }.observes('name', 'order'),

    loadMore: function(){

        if (this.get('isLoading')) {
            return;
        }

        var _self = this,
            feeds = this.get('feeds'),
            timestamp = (new Date()).getTime();

        this.set('requestID', timestamp);

        var params = {
            jsonp: 'jsonp',
            dataType: 'jsonp',
            type: 'GET'
        };

        if (this.get('after') !== null) {
            params.data = {
                after: this.get('after')
            };
        }

        jQuery
            .ajax(_self.get('url'), params)
            .then(function(data){
                if (_self.get('requestID') === timestamp) {
                    var listing = data.data.children;
                    feeds.pushObjects(listing.map(function(article){
                        return Feed.create(article.data);
                    }));
                    _self.set('requestID', null);
                }
            });

    },

    actions: {

    }

});