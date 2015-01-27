"use strict";

var _ = require('underscore');

var utils = require('./utils.js');

module.exports = function(App){

    App.AccountController = require('./controllers/AccountController.js');
    App.SidebarController = require('./controllers/SidebarController.js');
    App.StreamController = require('./controllers/StreamController.js');
    App.FeedController = require('./controllers/FeedController.js');


    App.ApplicationController = require('./controllers/ApplicationController.js');

    App.SubredditController = require('./controllers/SubredditController.js');

    App.SubredditPostController = Ember.ObjectController.extend({

        loadComments: function(){

            if (this.get('comments')) {
                return;
            }

            var requestID = _.uniqueId(),
                subredditName = this.get('post.subreddit'),
                postID = this.get('post.id'),
                _self = this;

            _self.requestID = requestID;

            return utils
                .promiseJson('https://reddit.com/r/' + subredditName + '/comments/' + postID + '.json')
                .then(function(data){
                    if (_self.requestID === requestID) {
                        var comments = data[1].data.children;
                        _self.set('comments', comments);
                    }
                });

        }.observes('model')

    });

};