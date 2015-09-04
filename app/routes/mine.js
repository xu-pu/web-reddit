import Ember from 'ember';

import utils from '../../utils';
import Link from '../../models/link';
import settings from '../../settings';

var TYPES = settings.CONTENT_TYPES;

export default Ember.Route.extend({

  beforeModel: function(transition){
    var account = this.controllerFor('account');
    return account.promiseResume();
  },

  model: function(params){
    return params.name;
  },

  afterModel: function(){
    this.controllerFor('application').set('isFullscreen', false);
  }

});
