import Ember from 'ember';

import utils from '../../utils';
import Link from '../../models/link';
import settings from '../../settings';

var TYPES = settings.CONTENT_TYPES;

export default Ember.Route.extend({

  beforeModel: function(){
    return this.controllerFor('account').promiseResume();
  },

  afterModel: function(){
    this.controllerFor('application').set('isFullscreen', false);
  }

});
