"use strict";

module.exports = function(App){

    App.StreamController = require('./controllers/StreamController.js');
    App.FeedController = require('./controllers/FeedController.js');

    App.SubredditController = require('./controllers/SubredditController.js');



};