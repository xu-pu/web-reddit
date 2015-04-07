"use strict";

var utils = require('../utils.js');

module.exports = Ember.Object.extend({

    list: [],

    before: null,

    after: null,

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