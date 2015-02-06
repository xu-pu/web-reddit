'use strict';

var setupRoutes = require('./router.js');

window.Promise = Promise || Ember.RSVP.Promise;

var App = window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});


//============================
// Components
//============================

App.FeedGridComponent = require('./components/FeedGridComponent.js');
App.FeedTileComponent = require('./components/FeedTileComponent.js');
App.ImageThumbnailComponent = require('./components/ImageThumbnailComponent.js');
App.SubredditWindowComponent = Ember.Component.extend();
App.SubredditOrderTabComponent = require('./components/SubredditOrderTabComponent.js');
App.CommentTreeComponent = require('./components/CommentTreeComponent.js');
App.CommentLeafComponent = require('./components/CommentLeafComponent.js');
App.FeedListComponent = require('./components/FeedListComponent.js');
App.FeedListItemComponent = require('./components/FeedListItemComponent.js');


//============================
// Resource Controllers
//============================

App.AccountController = require('./controllers/AccountController.js');
App.StreamController = require('./controllers/StreamController.js');
App.FeedController = require('./controllers/FeedController.js');
App.SearchController = require('./controllers/SearchController.js');


//============================
// Route Controllers
//============================

App.ApplicationController = require('./controllers/ApplicationController.js');

App.SubredditController = require('./controllers/SubredditController.js');

App.SubredditPostController = require('./controllers/SubredditPostController.js');

App.MeLikedController = Ember.Controller.extend({

    needs: ['stream'],

    isFull: true

});

App.MeSavedController = Ember.Controller.extend({

    needs: ['stream'],

    isFull: true

});

setupRoutes(App);