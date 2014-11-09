"use strict";

module.exports = function(App){

    App.StreamController = require('./controllers/StreamController.js');
    App.FeedsController = require('./controllers/FeedsController.js');
    App.FeedController = require('./controllers/FeedController.js');

};