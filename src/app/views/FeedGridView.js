'use strict';

module.exports = Ember.View.extend({

    tagName: 'ul',

    classNames: ['subreddit__grid'],

    actions: {

        organize: function(){
            $('.js__grid-tile').wookmark({
                container: jQuery(this.get('element')),
                align: 'left',
                offset: 15
            });
        }

    }

});