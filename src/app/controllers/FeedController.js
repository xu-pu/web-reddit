'use strict';

module.exports = Ember.ObjectController.extend({

    isImage: function(){
        var thumb = this.get('thumbnail');
        return !!thumb && thumb != 'self' && thumb != 'default' && thumb != 'nsfw';
    }.property('thumbnail'),

    hasImage: function(){
        var url = this.get('url');
        return url && url.match(/.(jpg)|(jpeg)|(gif)|(png)$/);
    }.property('url'),

    redditLink: function(){
        return 'https://www.reddit.com' + this.get('permalink');
    }.property('permalink')

});