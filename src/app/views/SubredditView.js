'use strict';

module.exports = Ember.View.extend({

    tagName: 'div',

    classNames: ['subreddit-container'],

    OrderTabView: Ember.View.extend({

        tagName: 'li',

        classNameBindings: ['isCurrent'],

        order: null,

        isCurrent: function(){
            return this.get('controller.order') === this.get('order');
        }.property('controller.order', 'order')

    })

});