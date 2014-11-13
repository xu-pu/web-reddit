'use strict';

var _  = require('underscore');

module.exports = Ember.View.extend({

    tagName: 'li',

    templateName: 'views/feed-tile',

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