'use strict';

var setupRoutes = require('./router.js');

window.Promise = Promise || Ember.RSVP.Promise;

var App = window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});


//============================
// Services
//============================

App.BackendService = require('./services/Backend.js');

//============================
// Components
//============================

App.FeedGridComponent = require('./components/FeedGrid.js');
App.FeedTileComponent = require('./components/FeedTile.js');
App.ImageThumbnailComponent = require('./components/ImageThumbnail.js');
App.SubredditWindowComponent = Ember.Component.extend({
    orders: ['hot', 'top', 'new', 'controversial']
});
App.SubredditOrderTabComponent = require('./components/SubredditOrderTab.js');
App.CommentTreeComponent = require('./components/CommentTree.js');
App.CommentLeafComponent = require('./components/CommentLeaf.js');
App.FeedListComponent = require('./components/FeedList.js');
App.FeedListItemComponent = require('./components/FeedListItem.js');
App.LinkDetailComponent = require('./components/LinkDetail.js');
App.ExpansionWindowComponent = require('./components/expansion-window.js');

//============================
// Resource Controllers
//============================

App.AccountController = require('./controllers/Account.js');
App.SearchController = require('./controllers/Search.js');

//============================
// Route Controllers
//============================

App.ApplicationController = require('./controllers/Application.js');
App.SubredditController = require('./controllers/Subreddit.js');
App.SubredditPostController = require('./controllers/SubredditPost.js');
App.MineController = require('./controllers/Mine.js');

setupRoutes(App);