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

App.FeedGridComponent = require('./components/feed-grid.js');
App.FeedTileComponent = require('./components/feed-tile.js');
App.ImageThumbnailComponent = require('./components/image-thumbnail.js');
App.SubredditWindowComponent = Ember.Component.extend({
    orders: ['hot', 'top', 'new', 'controversial']
});
App.SubredditOrderTabComponent = require('./components/subreddit-order-tab.js');
App.CommentTreeComponent = require('./components/comment-tree.js');
App.CommentLeafComponent = require('./components/comment-leaf.js');
App.FeedListComponent = require('./components/feed-list.js');
App.FeedListItemComponent = require('./components/feed-list-item.js');
App.LinkDetailComponent = require('./components/link-detail.js');
App.ExpansionWindowComponent = require('./components/expansion-window.js');
App.VoteButtonComponent = require('./components/vote-button.js');
App.SaveButtonComponent = require('./components/save-botton.js');
App.RedditLinkComponent = require('./components/reddit-link.js');
App.LoginBoxComponent = require('./components/login-box.js');

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
App.HomeController = require('./controllers/home.js');

setupRoutes(App);