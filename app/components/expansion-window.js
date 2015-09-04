"use strict";

module.exports = Ember.Component.extend({

    classNames: ['expansion-window'],

    actions: {
        close: function(){
            this.sendAction('close');
        }
    }

});