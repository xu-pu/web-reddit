'use strict';

var Subreddit = require('../models/Subreddit.js'),
    settings = require('../settings.js'),
    ORDERS = settings.SUBREDDIT_ORDERS;

module.exports = Ember.Controller.extend({

    backend: Ember.inject.service(),

    queryParams: ['order'],

    order: ORDERS.HOT,

    name: Ember.computed.alias('model'),

    subreddit: function(){
        return Subreddit.create(this.getProperties('order', 'name', 'backend'));
    }.property('order', 'name'),

    needs: ['application'],

    stream: Ember.computed.alias('subreddit.listing.list'),

    currentPath: Ember.computed.alias('controllers.application.currentPath'),

    isFull: function(){
        return this.get('currentPath') === 'subreddit.index';
    }.property('currentPath'),

    actions: {

        toggleFullscreen: function(){
            this.get('controllers.application').send('toggleFullscreen');
        },

        loadMore: function(){
            this.get('subreddit').more();
        },

        enter: function(model){
            this.transitionToRoute('subreddit.post', this.get('model'), model);
        }

    }

});