"use strict";

var utils = require('./utils.js'),
    Subreddit = require('./models/Subreddit.js'),
    settings = require('./settings.js'),
    TYPES = settings.CONTENT_TYPES;

module.exports = function(App){

    App.Router.map(function() {
        this.route('welcome');
        this.route('subreddit', { path: '/r/:name' }, function(){
            this.route('post', { path: '/post/:post'});
        })
    });

    App.ApplicationRoute = Ember.Route.extend();

    App.IndexRoute = Ember.Route.extend();

    App.WelcomeRoute = Ember.Route.extend();

    App.SubredditRoute = Ember.Route.extend({

        model: function(params){
            return Subreddit.create(params)
        },

        serialize: function(model){
            return {
                name: model.get('name')
            };
        }

    });

    App.SubredditPostRoute = Ember.Route.extend({

        model: function(params){
            var post = this.controllerFor('stream').get('model').findBy('id', params.post);
            if (post) {
                return post;
            }
            else {
                return utils
                    .promiseRedditListing('https://reddit.com/by_id/' + TYPES.LINK + '_' + params.post + '.json')
                    .then(function(listing){
                        return listing[0];
                    });
            }
        },

        serialize: function(model){
            return {
                post: model.get('id')
            };
        }

    });

};