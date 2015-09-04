"use strict";

var utils = require('../utils.js');

module.exports = Ember.Object.extend({

    list: null,

    backend: null, // need

    url: null, // need

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

    isLoading: false,

    more: function(){

        var backend = this.get('backend'),
            params = {},
            _self = this;

        if (this.get('isEnd')) { return; }
        else if (this.get('isEmpty')) {}
        else { params.after = this.get('after'); }

        this.set('isLoading', true);
        backend
            .ajax(this.get('url'), params)
            .then(function(data){
                _self.set('isLoading', false);
                _self.appendFromJson(data.data);
            },function(){
                _self.set('isLoading', false);
            });

    }.on('init'),

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