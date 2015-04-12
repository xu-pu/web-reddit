'use strict';

var urlUtils = require('url');

var settings = require('../settings.js'),
    TYPES = settings.CONTENT_TYPES;

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
    }.property('hasThumbnail', 'thumbnail'),

    fullname: function(){
        return TYPES.LINK + '_' + this.get('id');
    }.property('id'),

    isImgur: function(){
        return !!this.get('url').match(/imgur\.com/);
    }.property('url'),

    imgurEmbedUrl: function(){
        if (!this.get('isImgur')) { return; }

        var url = this.get('url');
        var parsed = urlUtils.parse(url);
        var path = parsed.pathname;
        if (!!path.match(/\/$/)) {
            parsed.pathname = path + 'embed';
        }
        else {
            parsed.pathname = path + '/embed';
        }
        return urlUtils.format(parsed);

    }.property('isImgur', 'url')

});