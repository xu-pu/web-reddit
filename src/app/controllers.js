"use strict";

module.exports = function(App){

    App.AccountController = require('./controllers/AccountController.js');
    App.SidebarController = require('./controllers/SidebarController.js');
    App.StreamController = require('./controllers/StreamController.js');
    App.FeedController = require('./controllers/FeedController.js');


    App.ApplicationController = require('./controllers/ApplicationController.js');

    App.SubredditController = require('./controllers/SubredditController.js');

    App.SubredditPostController = Ember.ObjectController.extend();

};