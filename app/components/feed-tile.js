'use strict';

var _  = require('underscore');

module.exports = Ember.Component.extend({

    feed: null,

    tagName: 'li',

    classNames: [
        'subreddit__grid-tile',
        'js__grid-tile'
    ],

    didInsertElement: function(){
        this.send('resize');
    },

    actions: {

        resize: function(){
            this.get('parentView').send('organize');
        },

        enter: function(){
            this.sendAction('enter', this.get('feed'));
        }

    }

});