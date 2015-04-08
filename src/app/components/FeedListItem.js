'use strict';

module.exports = Ember.Component.extend({

    tagName: 'li',

    classNames: ['subreddit__feed-list__item'],

    classNameBindings: ['feed.isCurrent']

});