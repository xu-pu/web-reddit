import Ember from 'ember';
import _ from 'npm:underscore';
import utils from '../../utils';

export default Ember.Controller.extend({

    needs: ['subreddit'],

    subreddit: Ember.computed.alias('controllers.subreddit.subreddit'),

    backend: Ember.inject.service()

});
