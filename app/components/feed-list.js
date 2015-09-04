'use strict';

module.exports = Ember.Component.extend({

    subreddit: null, // need

    listing: null, // need

    stream: Ember.computed.alias('listing.list'),

    isLoading: Ember.computed.alias('listing.isLoading'),

    isEnd: Ember.computed.alias('listing.isEnd'),

    tagName: 'ul',

    classNames: ['feed-list'],

    actions: {

        more: function(){
            if (!this.get('isEnd')) {
                this.get('listing').more();
            }
        },

        enter: function(model){
            this.sendAction('enter', model);
        }
    }

});