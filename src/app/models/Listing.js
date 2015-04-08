"use strict";

var utils = require('../utils.js');

module.exports = Ember.Object.extend({

    list: null,

    before: null,

    after: Infinity,

    onInit: function(){
        this.set('list', []);
    }.on('init'),

    isEmpty: function(){
        return this.get('after') === Infinity;
    }.property('after'),

    isEnd: function(){
        return this.get('after') === null;
    }.property('after'),

    appendFromJson: function(data){
        var after = data.after,
            children = data.children;
        var feeds = children.map(function(entry){
            return utils.convertRedditThing(entry);
        });
        this.get('list').pushObjects(feeds);
        this.set('after', after);
    }

});