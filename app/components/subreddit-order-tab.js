import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'li',

    classNameBindings: ['isCurrent'],

    order: null,

    isCurrent: function(){
        return this.get('subreddit.order') === this.get('order');
    }.property('subreddit.order', 'order')

});
