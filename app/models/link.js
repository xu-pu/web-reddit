import Ember from 'ember';
import urlUtils from 'npm:url';
import settings from '../settings';

var TYPES = settings.CONTENT_TYPES;

var imagePattern = /\.(jpg)|(jpeg)|(gif)|(png)|(webm)\?(.*)$/,
    imgurPattern = /imgur\.com/;
var albumPattern = /^\/a\/(.*)\/?$/;
var galleryPattern = /^\/(?:gallery\/)(.*)\/?$/;
var singlePattern = /^\/(.*)\/?$/;

export default Ember.Object.extend({

    image: null,

    imgurEmbedUrl: null,

    isImage: function () {
        return this.get('image') || this.get('hasThumbnail');
    }.property('hasThumbnail', 'hasFull'),

    hasThumbnail: function () {
        var thumb = this.get('thumbnail');
        return !!thumb && thumb != 'self' && thumb != 'default' && thumb != 'nsfw';
    }.property('thumbnail'),

    redditLink: function () {
        return 'https://www.reddit.com' + this.get('permalink');
    }.property('permalink'),

    fullname: function(){
        return TYPES.LINK + '_' + this.get('id');
    }.property('id'),

    analyzeUrl: function(){

        var url = this.get('url');

        if (url && url.match(imagePattern)) {
            this.set('image', url);
            return;
        }

        if (!url.match(imgurPattern)) {
            return;
        }

        var _self = this;
        var parsed = urlUtils.parse(url);
        var path = parsed.pathname;
        var match, id;

        match = path.match(galleryPattern);
        if (match) {
            id = match[1];
            jQuery
                .getJSON('/imgur/image/'+id)
                .then(function(data){
                    _self.set('image', data.data.link);
                }, function(){
                    parsed.pathname = '/a/'+id+'/embed';
                    _self.set('imgurEmbedUrl', urlUtils.format(parsed));
                });
            return;
        }

        match = path.match(albumPattern);
        if (match) {
            id = match[1];
            parsed.pathname = '/a/'+id+'/embed';
            this.set('imgurEmbedUrl', urlUtils.format(parsed));
            return;
        }

        match = path.match(singlePattern);
        if (match) {
            id = match[1];
            jQuery
                .getJSON('/imgur/image/'+id)
                .then(function(data){
                    _self.set('image', data.data.link);
                });
        }

    }.on('init')

});
