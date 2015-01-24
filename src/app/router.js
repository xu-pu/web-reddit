"use strict";

var Subreddit = require('./models/Subreddit.js');

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
            return this.controllerFor('stream').get('model').findBy('id', params.post);
        },

        serialize: function(model){
            return {
                post: model.get('id')
            };
        }

    });

};