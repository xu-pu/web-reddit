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
        });
        this.route('me', function(){
            this.route('liked');
        });
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
                subredditName = this.modelFor('subreddit').get('name'),
                postModel = this.controllerFor('stream').get('model').findBy('id', postID);

            if (postModel) {
                return { post: postModel };
            }
            else {
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

        }

    });

    App.MeLikedRoute = Ember.Route.extend({

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

};