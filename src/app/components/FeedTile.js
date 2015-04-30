'use strict';

var _  = require('underscore');

module.exports = Ember.Component.extend({

    backend: Ember.inject.service(),

    feed: null,

    tagName: 'li',

    classNames: [
        'subreddit__grid-tile',
        'js__grid-tile'
    ],

    didInsertElement: function(){
        this.send('resize');
    },

    upvoted: function(){
        return this.get('feed.likes') === true;
    }.property('feed.likes'),

    downvoted: function(){
        return this.get('feed.likes') === false;
    }.property('feed.likes'),

    savePending: false,

    votePending: false,

    actions: {

        resize: function(){
            this.get('parentView').send('organize');
        },

        enter: function(){
            this.sendAction('enter', this.get('feed'));
        },

        toggleVote: function(isUp){
            if (this.get('votePending')) {
                return;
            }
            var _self = this;
            var liked = this.get('feed.likes');
            var vote;

            if (isUp) {
                if (liked === true) {
                    vote = 0;
                }
                else {
                    vote = 1;
                }
            }
            else {
                if (liked === false) {
                    vote = 0;
                }
                else {
                    vote = -1;
                }
            }
            this.set('votePending', true);
            this.get('backend')
                .promiseVote(this.get('feed'), vote)
                .then(function(){
                    _self.set('votePending', false);
                    if (vote === 0) {
                        _self.set('feed.likes', null);
                    }
                    else if (vote === 1) {
                        _self.set('feed.likes', true);
                    }
                    else {
                        _self.set('feed.likes', false);
                    }
                }, function(){
                    _self.set('votePending', false);
                });
        }

    }

});