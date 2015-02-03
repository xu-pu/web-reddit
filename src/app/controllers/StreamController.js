'use strict';

var Link = require('../models/Link.js'),
    settings = require('../settings.js');

module.exports = Ember.ArrayController.extend({

    itemController: 'feed',

    model: [],

    url: null,

    after: null,

    requestID: null,

    isLoading: function(){
        return this.get('requestID') !== null;
    }.property('requestID'),

    onNewUrl: function(){
        if (this.get('url')) {
            this.send('refresh');
        }
    }.observes('url'),

    actions: {

        loadMore: function(){

            if (this.get('isLoading')) {
                return;
            }

            var _self = this,
                feeds = this.get('model'),
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
                            return Link.create(article.data);
                        }));
                        _self.set('after', data.data.after);
                        _self.set('requestID', null);
                    }
                });
        },


        refresh: function(){
            this.get('model').clear();
            this.setProperties({
                requestID: null,
                after: null
            });
            this.send('loadMore');
        }

    }

});