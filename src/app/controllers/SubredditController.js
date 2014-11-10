'use strict';

var settings = require('../settings.js'),
    ORDERS = settings.SUBREDDIT_ORDERS;

module.exports = Ember.ObjectController.extend({

    needs: ['stream'],

    stream: Ember.computed.alias('controllers.stream'),

    queryParams: ['order'],

    order: ORDERS.HOT,

    orders: ['hot', 'top', 'new', 'controversial'],

    url: function(){
        return  'https://reddit.com/r/' + this.get('name') + '/' + this.get('order') + '.json';
    }.property('name', 'order'),

    updateStream: function(){
        this.get('stream').send('refresh');
    }.observes('order', 'name'),

    actions: {

        loadMore: function(){
            this.get('stream').send('loadMore');
        }

    }

});