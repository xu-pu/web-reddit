'use strict';

module.exports = Ember.ObjectController.extend({

    isImage: function(){
        var thumb = this.get('thumbnail'),
            url = this.get('url'),
            hasURL = url && url.match(/.(jpg)|(jpeg)|(gif)|(png)$/),
            hasThumb = !!thumb && thumb != 'self' && thumb != 'default' && thumb != 'nsfw';
        return hasURL || hasThumb;
    }.property('thumbnail', 'url'),

    redditLink: function(){
        return 'https://www.reddit.com' + this.get('permalink');
    }.property('permalink')

});