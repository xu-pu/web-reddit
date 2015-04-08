'use strict';

module.exports = Ember.Component.extend({

    feed: null,

    tagName: 'li',

    classNames: ['subreddit__feed-list__item'],

    classNameBindings: ['feed.isCurrent'],

    click: function(){
        this.send('enter');
    },

    actions: {
        enter: function(){
            this.sendAction('enter', this.get('feed'));
        }
    }

});