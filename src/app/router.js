"use strict";

var utils = require('./utils.js'),
    Subreddit = require('./models/Subreddit.js'),
    Link = require('./models/Link.js'),
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

            var postID = params.post,
                subredditName = this.modelFor('subreddit').get('name');

            return utils
                .promiseJson('https://reddit.com/r/' + subredditName + '/comments/' + postID + '.json')
                .then(function(data){
                    var post = Link.create(data[0].data.children[0].data);
                    return {
                        post: post,
                        comments: data[1].data.children
                    };
                });

        }

    });

};