'use strict';

module.exports = Ember.Component.extend({

    tagName: 'div',

    classNames: ['thumbnail-container'],

    tile: Ember.computed.alias('parentView'),

    thumbnail: Ember.computed.alias('feed.thumbnail'),

    url: Ember.computed.alias('feed.url'),

    $thumbnail: null,

    $fullsize: null,

    thumbnailReady: false,

    fullsizeReady: false,

    initDownload: function(){

        var _self = this;

        if (this.get('feed.hasThumbnail')) {
            var thumbnail = document.createElement('img');
            var $thumbnail = jQuery(thumbnail);
            thumbnail.src = this.get('thumbnail');
            $thumbnail
                .addClass('thumbnail')
                .on('load', function(){
                    _self.set('thumbnailReady', true);
                    Ember.run.once(_self, 'onThumbnailReady');
                });
            this.set('$thumbnail', $thumbnail);
        }

        if (this.get('feed.hasFull')) {
            var fullsize = document.createElement('img');
            var $fullsize = jQuery(fullsize);
            fullsize.src = this.get('url');
            $fullsize
                .addClass('fullsize')
                .on('load', function(){
                    _self.set('fullsizeReady', true);
                    Ember.run.once(_self, 'onFullsizeReady');
                });
            this.set('$fullsize', $fullsize);
        }

    }.on('didInsertElement'),

    onThumbnailReady: function(){
        if (!this.get('fullsizeReady')) {
            jQuery(this.get('element'))
                .append(this.get('$thumbnail'));
        }
        this.get('tile').send('resize');
    },

    onFullsizeReady: function(){
        jQuery(this.get('element'))
            .empty()
            .append(this.get('$fullsize'));
        this.get('tile').send('resize');
    },

    abortDownload: function(){
        if (this.get('$thumbnail')) {
            this.get('$thumbnail').off('load');
        }
        if (this.get('$fullsize')) {
            this.get('$fullsize').off('load')
        }
    }.on('willDestroyElement')

});