"use strict";

var _ = require('underscore');

var utils = require('./utils.js');

module.exports = function(App){

    App.AccountController = require('./controllers/AccountController.js');
    App.SidebarController = require('./controllers/SidebarController.js');
    App.StreamController = require('./controllers/StreamController.js');
    App.FeedController = require('./controllers/FeedController.js');
    App.SearchController = require('./controllers/SearchController.js');

    App.ApplicationController = require('./controllers/ApplicationController.js');

    App.SubredditController = require('./controllers/SubredditController.js');

    App.SubredditPostController = Ember.ObjectController.extend({

        requestID: null,

        isLoadingComments: function(){
            return !!this.get('requestID');
        }.property('requestID'),

        loadComments: function(){

            if (this.get('comments')) {
                return;
            }

            var requestID = _.uniqueId(),
                subredditName = this.get('post.subreddit'),
                postID = this.get('post.id'),
                _self = this;

            _self.set('requestID', requestID);

            return utils
                .promiseJson('https://reddit.com/r/' + subredditName + '/comments/' + postID + '.json')
                .then(
                function(data){
                    if (_self.get('requestID') === requestID) {
                        var comments = data[1].data.children;
                        _self.set('comments', comments);
                        _self.set('requestID', null);
                    }
                },
                function(){
                    console.log('loading failed');
                    _self.loadComments();
                }
            );

        }.observes('model')

    });

};