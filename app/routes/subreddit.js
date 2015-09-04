import Ember from 'ember';

import utils from '../../utils';
import Link from '../../models/link';
import settings from '../../settings';

var TYPES = settings.CONTENT_TYPES;

export default Ember.Route.extend({

  beforeModel: function(){
    var account = this.controllerFor('account');
    return account.promiseResume().catch(function(){});
  },

  model: function(params){
    return params.name;
  },

  serialize: function(model){
    return {
      name: model
    };
  },

  actions: {
    error: function(e, transition){
      if (transition) {
        transition.abort();
      }
    }
  }

});
