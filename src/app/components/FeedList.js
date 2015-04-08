'use strict';

module.exports = Ember.Component.extend({

    subreddit: null, // need

    stream: Ember.computed.alias('subreddit.listing.list'),

    isLoading: Ember.computed.alias('subreddit.isLoading'),

    isEnd: Ember.computed.alias('subreddit.isEnd'),

    tagName: 'ul',

    classNames: ['feed-list'],

    actions: {

        more: function(){
            if (!this.get('isEnd')) {
                this.get('subreddit').more();
            }
        },

        enter: function(model){
            this.sendAction('enter', model);
        }
    }

});