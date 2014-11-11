'use strict';

module.exports = Ember.View.extend({

    tagName: 'div',

    classNames: ['subreddit-container'],

    classNameBindings: ['isFullscreen'],

    isFullscreen: Ember.computed.alias('controller.isFullscreen'),

    OrderTabView: Ember.View.extend({

        tagName: 'li',

        classNameBindings: ['isCurrent'],

        order: null,

        isCurrent: function(){
            return this.get('controller.order') === this.get('order');
        }.property('controller.order', 'order')

    })

});