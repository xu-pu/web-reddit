import Ember from 'ember';
import Listing from '../models/listing.js';

export default Ember.Controller.extend({

    needs: ['account'],

    account: Ember.computed.alias('controllers.account'),

    backend: Ember.inject.service(),

    name: Ember.computed.alias('model'),

    url: function(){
        return '/user/' + this.get('account.profile.name') + '/' + this.get('name');
    }.property('name'),

    listing: function(){
        return Listing.create(this.getProperties('url', 'backend'));
    }.property('name'),

    actions: {
        enter: function(link){
            this.transitionToRoute('mine.post', link);
        }
    }

});
