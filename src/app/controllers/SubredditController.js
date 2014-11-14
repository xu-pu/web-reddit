'use strict';

var settings = require('../settings.js');

module.exports = Ember.ObjectController.extend({

    needs: ['stream', 'application'],

    stream: Ember.computed.alias('controllers.stream'),

    orders: ['hot', 'top', 'new', 'controversial'],

    url: function(){
        return  'https://reddit.com/r/' + this.get('name') + '/' + this.get('order') + '.json';
    }.property('name', 'order'),

    updateStream: function(){
        this.get('stream').send('refresh');
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