import Ember from 'ember';

export default Ember.Component.extend({

    feed: null, //need

    tagName: 'div',

    classNames: ['thumbnail-container'],

    tile: Ember.computed.alias('parentView'),

    thumbnail: Ember.computed.alias('feed.thumbnail'),

    url: Ember.computed.alias('feed.image'),

    $thumbnail: null,

    $fullsize: null,

    thumbnailReady: false,

    fullsizeReady: false,

    initThumbnail: function(){
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
    }.observes('thumbnail'),

    initFullsize: function(){
        var _self = this;

        if (this.get('url')) {
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
    }.observes('url'),

    onFeedChange: function(){
        this.setProperties({
            $thumbnail: null,
            $fullsize: null,
            thumbnailReady: false,
            fullsizeReady: false
        });
    }.on('feed'),

    initElement: function(){
        this.initThumbnail();
        this.initFullsize();
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
