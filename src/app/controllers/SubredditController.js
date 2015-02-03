'use strict';

var settings = require('../settings.js'),
    ORDERS = settings.SUBREDDIT_ORDERS;

module.exports = Ember.ObjectController.extend({

    queryParams: ['order'],

    order: ORDERS.HOT,

    needs: ['stream', 'application'],

    stream: Ember.computed.alias('controllers.stream'),

    currentPath: Ember.computed.alias('controllers.application.currentPath'),

    isFull: function(){
        return this.get('currentPath') === 'subreddit.index';
    }.property('currentPath'),

    orders: ['hot', 'top', 'new', 'controversial'],

    url: function(){
        return  'https://reddit.com/r/' + this.get('name') + '/' + this.get('order') + '.json';
    }.property('name', 'order'),

    updateStream: function(){
        this.get('stream').setProperties({
            url: this.get('url'),
            isOauth: false
        });
    }.observes('order', 'name'),

    actions: {

        toggleFullscreen: function(){
            this.get('controllers.application').send('toggleFullscreen');
        },

        loadMore: function(){
            this.get('stream').send('loadMore');
        }

    }

});