'use strict';

module.exports = Ember.Controller.extend({

    needs: ['sidebar'],

    isFullscreen: false,

    actions: {

        toggleFullscreen: function(){
            this.toggleProperty('isFullscreen');
        }

    }

});