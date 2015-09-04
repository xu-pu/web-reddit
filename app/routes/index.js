import Ember from 'ember';

import utils from '../../utils';
import Link from '../../models/link';
import settings from '../../settings';

var TYPES = settings.CONTENT_TYPES;

export default Ember.Route.extend({

  beforeModel: function(trasition){
    var _self = this;
    var account = this.controllerFor('account');
    return account.promiseResume()
      .then(function(){
        _self.transitionTo('home');
      });
  }

});
