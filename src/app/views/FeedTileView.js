'use strict';

module.exports = Ember.View.extend({

    tagName: 'li',

    templateName: 'views/feed-tile',

    classNames: [
        'subreddit__grid-tile',
        'js__grid-tile'
    ],

    didInsertElement: function(){
        var _self = this;
        this.get('parentView').send('organize');
        $('img', this.get('element')).on('load', function(){
            _self.get('parentView').send('organize');
        })
    }

});