import Ember from 'ember';

import utils from '../../utils';
import Link from '../../models/link';
import settings from '../../settings';

var TYPES = settings.CONTENT_TYPES;

export default Ember.Route.extend({

  model: function(params, transition){
    var postID = params.post,
      subredditName = transition.params.subreddit.name;
    return utils
      .promiseJson('https://reddit.com/r/' + subredditName + '/comments/' + postID + '.json')
      .then(function(data){
        return Link.create(data[0].data.children[0].data);
      });
  },

  serialize: function(model){
    return {
      post: model.get('id')
    };
  },

  actions: {
    close: function(){
      this.transitionTo('subreddit');
    }
  }

});
