'use strict';

var _  = require('underscore');

module.exports = Ember.Component.extend({

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
        }

    }

});