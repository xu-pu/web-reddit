'use strict';

var _ = require('underscore');

module.exports = Ember.Component.extend({

    tagName: 'ul',

    classNames: ['subreddit__grid'],

    onChangeSize: function(){
        this.send('organize');
    }.observes('controller.length'),

    actions: {

        organize: function(){
            Ember.run.once(this, 'reorganize');
        }

    },

    reorganize: function(){
        jQuery('.js__grid-tile').wookmark({
            container: jQuery(this.get('element')),
            align: 'center',
            offset: 15
        });
    }.on('didInsertElement')

});