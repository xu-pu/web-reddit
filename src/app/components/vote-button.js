'use strict';

module.exports = Ember.Component.extend({

    content: null, // need

    isUp: false,

    likes: Ember.computed.alias('content.likes'),

    votePending: Ember.computed.alias('content.votePending'),

    upvoted: function(){
        return this.get('likes') === true;
    }.property('likes'),

    downvoted: function(){
        return this.get('likes') === false;
    }.property('likes'),

    isOn: function(){
        return ( this.get('isUp') && this.get('upvoted') ) || ( !this.get('isUp') && this.get('downvoted') );
    }.property('isUp', 'likes'),

    classNameBindings: ['isUp:upvote:downvote', 'votePending:is-pending', 'isOn:is-on'],

    classNames: 'vote-button',

    backend: Ember.inject.service(),

    click: function(){
        this.send('toggleVote');
    },

    actions: {

        toggleVote: function(){
            if (this.get('votePending')) {
                return;
            }
            var _self = this;
            var isUp = this.get('isUp');
            var likes = this.get('likes');
            var vote;

            if (isUp) {
                if (likes === true) {
                    vote = 0;
                }
                else {
                    vote = 1;
                }
            }
            else {
                if (likes === false) {
                    vote = 0;
                }
                else {
                    vote = -1;
                }
            }
            this.set('votePending', true);
            this.get('backend')
                .promiseVote(this.get('content'), vote)
                .then(function(){
                    _self.set('votePending', false);
                    if (vote === 0) {
                        _self.set('likes', null);
                    }
                    else if (vote === 1) {
                        _self.set('likes', true);
                    }
                    else {
                        _self.set('likes', false);
                    }
                }, function(){
                    _self.set('votePending', false);
                });
        }

    }

});