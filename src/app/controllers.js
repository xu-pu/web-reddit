"use strict";

module.exports = function(App){

    App.ApplicationController = require('./controllers/ApplicationController.js');
    App.SidebarController = require('./controllers/SidebarController.js');
    App.SubredditController = require('./controllers/SubredditController.js');
    App.StreamController = require('./controllers/StreamController.js');
    App.FeedController = require('./controllers/FeedController.js');

};