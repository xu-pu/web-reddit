'use strict';

var _ = require('underscore');

module.exports = Ember.View.extend({

    tagName: 'ul',

    classNames: ['subreddit__grid'],

    onChangeSize: function(){
        this.send('organize');
    }.observes('controller.length'),

    resizeFlag: false,

    actions: {

        organize: function(){
            var _self = this;
            this.set('resizeFlag', true);
            _.delay(function(){
                _self.send('organizeNow');
            }, 0)
        },

        organizeNow: function(){
            if (this.get('resizeFlag')) {
                jQuery('.js__grid-tile').wookmark({
                    container: jQuery(this.get('element')),
                    align: 'center',
                    offset: 15
                });
                this.set('resizeFlag', false);
            }
        }

    }

});