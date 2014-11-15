"use strict";

var Subreddit = require('./models/Subreddit.js');
module.exports = function(App){

    App.Router.map(function() {
        this.route('welcome');
        this.route('shortcut', { path: '/subreddit/:name' });
        this.route('subreddit', { path: '/subreddit/:name/:order' })
    });

    App.ApplicationRoute = Ember.Route.extend();

    App.IndexRoute = Ember.Route.extend();

    App.WelcomeRoute = Ember.Route.extend();

    App.ShortcutRoute = Ember.Route.extend({

        model: function(params){
            this.transitionTo('subreddit', Subreddit.create(params));
        }

    });

    App.SubredditRoute = Ember.Route.extend({

        model: function(params){
            return Subreddit.create(params)
        },

        serialize: function(model){
            return {
                order: model.get('order'),
                name: model.get('name')
            };
        }

    });

};