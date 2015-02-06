'use strict';

var _ = require('underscore');

module.exports = Ember.Component.extend({

    tagName: 'div',

    classNames: ['subreddit__grid-container'],

    onChangeSize: function(){
        this.send('organize');
    }.observes('stream.length'),

    actions: {

        organize: function(){
            Ember.run.once(this, 'reorganize');
        }

    },

    reorganize: function(){
        jQuery('.js__grid-tile').wookmark({
            container: jQuery('ul', this.get('element')),
            align: 'center',
            offset: 15
        });
    }.on('didInsertElement')

});