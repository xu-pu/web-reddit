'use strict';

module.exports = Ember.Object.extend({

    isImage: function () {
        return this.get('hasFull') || this.get('hasThumbnail');
    }.property('hasThumbnail', 'hasFull'),

    hasThumbnail: function () {
        var thumb = this.get('thumbnail');
        return !!thumb && thumb != 'self' && thumb != 'default' && thumb != 'nsfw';
    }.property('thumbnail'),

    hasFull: function () {
        var url = this.get('url');
        return url && url.match(/.(jpg)|(jpeg)|(gif)|(png)$/);
    }.property('url'),

    redditLink: function () {
        return 'https://www.reddit.com' + this.get('permalink');
    }.property('permalink'),

    backgroundStyle: function () {
        if (this.get('hasThumbnail')) {
            return 'background-image: url(' + this.get('thumbnail') + ')';
        }
    }.property('hasThumbnail', 'thumbnail')

});