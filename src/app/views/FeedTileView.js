'use strict';

var _  = require('underscore');

module.exports = Ember.View.extend({

    tagName: 'li',

    templateName: 'views/feed-tile',

    classNames: [
        'subreddit__grid-tile',
        'js__grid-tile'
    ],

    classNameBindings: ['imageReady'],

    thumbnailReady: false,

    imageReady: false,

    thumbnailVisiable: function(){
        return this.get('controller.isImage') && !this.get('imageReady');
    }.property('controller.isImage', 'imageReady'),

    didInsertElement: function(){
        var _self = this;
        this.get('parentView').send('organize');

        $('img.thumbnail', this.get('element')).on('load', function(){
            _self.set('thumbnailReady', true);
            _self.send('resize');
        });

        $('img.full-size', this.get('element')).on('load', function(){
            _self.set('imageReady', true);
            _self.send('resize');
        })
    },

    actions: {

        resize: function(){
            this.get('parentView').send('organize');
        }

    }

});