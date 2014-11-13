'use strict';

module.exports = Ember.View.extend({

    tagName: 'div',

    templateName: 'views/image-thumbnail',

    thumbnailReady: false,

    imageReady: false,

    $thumbnail: function(){
        return jQuery('img.thumbnail', this.get('element')).first();
    }.property(),

    $fullsize: function(){
        return jQuery('img.full-size', this.get('element')).first();
    }.property(),

    hasFull: function(){
        var url = this.get('url');
        return url && url.match(/.(jpg)|(jpeg)|(gif)|(png)$/);
    }.property('url'),

    hasThumbnail: function(){
        var thumb = this.get('thumbnail');
        return !!thumb && thumb != 'self' && thumb != 'default' && thumb != 'nsfw';
    }.property('thumbnail'),

    didInsertElement: function(){
        var _self = this;
        this.get('$thumbnail').on('load', function(){
            _self.get('$thumbnail').off('load');
            _self.set('thumbnailReady', true);
            _self.send('loaded');
        });
        if (this.get('hasFull')) {
            this.get('$fullsize').on('load', function(){
                _self.get('$thumbnail').off('load');
                _self.get('$fullsize').off('load');
                _self.set('imageReady', true);
                _self.send('loaded');
            })
        }
    },

    willDestroyElement: function(){
        this.get('$thumbnail').off('load');
        this.get('$fullsize').off('load')
    },

    actions: {

        loaded: function(){
            this.get('parentView').send('resize');
        }

    }

});