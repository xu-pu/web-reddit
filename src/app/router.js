"use strict";

var utils = require('./utils.js'),
    Link = require('./models/Link.js'),
    settings = require('./settings.js'),
    TYPES = settings.CONTENT_TYPES;

module.exports = function(App){

    App.Router.map(function() {
        this.route('welcome');
        this.route('subreddit', { path: '/r/:name' }, function(){
            this.route('post', { path: '/:post'});
        });
        this.route('mine', { path: '/mine/:name'}, function(){
            this.route('post', { path: '/:post'});
        });
    });

    App.ApplicationRoute = Ember.Route.extend();

    App.IndexRoute = Ember.Route.extend();

    App.WelcomeRoute = Ember.Route.extend();

    App.SubredditRoute = Ember.Route.extend({

        beforeModel: function(){
            var account = this.controllerFor('account');
            return account.promiseResume().catch();
        },

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
        }

    });


    App.MineRoute = Ember.Route.extend({

        beforeModel: function(transition){
            var account = this.controllerFor('account');
            return account.promiseResume();
        },

        model: function(params){
            return params.name;
        },

        afterModel: function(){
            this.controllerFor('application').set('isFullscreen', false);
        }

    });

    App.MinePostRoute = Ember.Route.extend({

        backend: Ember.inject.service(),

        model: function(params){
            var postID = params.post;
            var backend = this.get('backend');
            return backend.ajax('/api/info', { id: TYPES.LINK + '_' + postID })
                .then(function(data){
                    return Link.create(data.data.children[0].data);
                });
        },

        serialize: function(model){
            return {
                post: model.get('id')
            };
        },

        actions: {
            close: function(){
                this.transitionTo('mine');
            }
        }

    });


};