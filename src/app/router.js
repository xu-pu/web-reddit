"use strict";

var utils = require('./utils.js'),
    Subreddit = require('./models/Subreddit.js'),
    Link = require('./models/Link.js'),
    settings = require('./settings.js');

module.exports = function(App){

    App.Router.map(function() {
        this.route('welcome');
        this.route('subreddit', { path: '/r/:name' }, function(){
            this.route('post', { path: '/post/:post'});
        });
/*
        this.route('me', function(){
            this.route('liked');
            this.route('saved');
        });
*/
    });

    App.ApplicationRoute = Ember.Route.extend();

    App.IndexRoute = Ember.Route.extend();

    App.WelcomeRoute = Ember.Route.extend();

    App.SubredditRoute = Ember.Route.extend({

        model: function(params){
            return params.name;
        },

        serialize: function(model){
            return {
                name: model
            };
        }

    });

    App.SubredditPostRoute = Ember.Route.extend({

        model: function(params){
            var postID = params.post,
                subredditName = params.name;
            return utils
                .promiseJson('https://reddit.com/r/' + subredditName + '/comments/' + postID + '.json')
                .then(function(data){
                    var post = Link.create(data[0].data.children[0].data);
                    return {
                        post: post,
                        comments: data[1].data.children
                    };
                });
        },

        serialize: function(model){
            return {
                post: model.get('id')
            };
        }

    });

    /*
    App.MeLikedRoute = Ember.Route.extend({

        templateName: 'me/stream',

        beforeModel: function(transition){
            var account = this.controllerFor('account');
            return account.promiseResume();
        },

        setupController: function(){
            var username = this.controllerFor('account').get('name');
            var url = '/reddit/user/' + username + '/liked';
            this.controllerFor('stream').set('isOauth', true);
            this.controllerFor('stream').set('url', url);
            this.controllerFor('application').set('isFullscreen', false);
        }

    });

    App.MeSavedRoute = Ember.Route.extend({

        templateName: 'me/stream',

        beforeModel: function(transition){
            var account = this.controllerFor('account');
            return account.promiseResume();
        },

        setupController: function(){
            var username = this.controllerFor('account').get('name');
            var url = '/reddit/user/' + username + '/saved';
            this.controllerFor('stream').set('isOauth', true);
            this.controllerFor('stream').set('url', url);
            this.controllerFor('application').set('isFullscreen', false);
        }

    });
*/
};