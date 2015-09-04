import Ember from 'ember';

import utils from '../../utils';
import Link from '../../models/link';
import settings from '../../settings';

var TYPES = settings.CONTENT_TYPES;

export default Ember.Route.extend({

  actions: {

    toggleFullscreen: function(){
      this.controllerFor('application').toggleProperty('isFullscreen');
    },

    error: function(e, transition){
      if (transition) {
        transition.abort();
        this.transitionTo('subreddit', 'pics');
      }
    }

  }

});
