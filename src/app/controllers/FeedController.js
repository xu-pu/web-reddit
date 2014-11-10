'use strict';

module.exports = Ember.ObjectController.extend({

    isImage: function(){
        var thumb = this.get('thumbnail');
        return !!thumb && thumb!='self';
    }.property('thumbnail'),

    actions: {

        loadImage: function(){

        }

    }

});