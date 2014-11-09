'use strict';

var settings = require('../settings.js'),
    ORDERS = settings.SUBREDDIT_ORDERS;

module.exports = Ember.ObjectController.extend({

    needs: ['stream'],

    stream: Ember.computed.alias('controllers.stream'),

    queryParams: ['order'],

    order: ORDERS.HOT,

    updateStream: function(){
        this.get('stream').send('refresh');
    }.observes('name', 'order'),

    actions: {

        loadMore: function(){
            this.get('stream').send('loadMore');
        }

    }

});