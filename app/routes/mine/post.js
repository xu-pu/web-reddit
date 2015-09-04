import Ember from 'ember';

import utils from '../../utils';
import Link from '../../models/link';
import settings from '../../settings';

var TYPES = settings.CONTENT_TYPES;

export default Ember.Route.extend({

  backend: Ember.inject.service(),

  model: function(params){
    var postID = params.post;
    var backend = this.get('backend');
    return backend.ajax('/api/info', { id: TYPES.LINK + '_' + postID })
      .then(function(data){
        return Link.create(data.data.children[0].data);
      });
  },

  serialize: function(model){
    return {
      post: model.get('id')
    };
  },

  actions: {
    close: function(){
      this.transitionTo('mine');
    }
  }

});
