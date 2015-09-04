'use strict';

module.exports = Ember.Component.extend({

    content: null, // need

    tagName: 'a',

    attributeBindings: ['target', 'href'],

    classNames: 'reddit-link',

    href: Ember.computed.alias('content.redditLink'),

    target: '_blank'

});