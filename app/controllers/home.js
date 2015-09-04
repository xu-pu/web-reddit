import Ember from 'ember';
import Listing from '../models/listing.js';

export default Ember.Controller.extend({

    backend: Ember.inject.service(),

    subscribed: function(){
        return Listing.create({
            backend: this.get('backend'),
            url: '/subreddits/mine/subscriber'
        });
    }.property(),

    actions: {
        more: function(){
            this.get('subscribed').more();
        }
    }

});
