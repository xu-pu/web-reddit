'use strict';

module.exports = Ember.ObjectController.extend({

    needs: ['subredditPost'],

    current: Ember.computed.alias('controllers.subredditPost.post.id'),

    isCurrent: function(){
        return this.get('id') === this.get('current');
    }.property('id', 'current')

});