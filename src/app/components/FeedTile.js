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

    savePending: false,

    actions: {

        resize: function(){
            this.get('parentView').send('organize');
        },

        enter: function(){
            this.sendAction('enter', this.get('feed'));
        },

        toggleSave: function(){
            if (this.get('savePending')) {
                return;
            }
            var _self = this;
            this.set('savePending', true);
            this.get('backend')
                .promiseSave(this.get('feed'), this.get('feed.saved'))
                .then(function(){
                    _self.set('savePending', false);
                    _self.toggleProperty('feed.saved');
                }, function(){
                    _self.set('savePending', false);
                });
        }

    }

});