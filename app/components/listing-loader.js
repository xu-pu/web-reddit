"use strict";

module.exports = Ember.Component.extend({

    listing: null, // need

    tagName: 'div',

    classNames: 'listing-loader',

    actions: {
        more: function(){
            this.get('listing').more();
        }
    }

});