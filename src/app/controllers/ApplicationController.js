'use strict';

module.exports = Ember.Controller.extend({

    needs: ['sidebar'],

    isFullscreen: true,

    actions: {

        toggleFullscreen: function(){
            this.toggleProperty('isFullscreen');
        }

    }

});