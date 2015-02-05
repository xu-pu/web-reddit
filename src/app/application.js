'use strict';

var setupControllers = require('./controllers.js'),
    setupRoutes = require('./router.js');

jQuery.event.props.push( "dataTransfer" );

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
App.SubredditWindowComponent = require('./components/SubredditWindowComponent.js');
App.SubredditOrderTabComponent = require('./components/SubredditOrderTabComponent.js');
App.CommentTreeComponent = require('./components/CommentTreeComponent.js');
App.CommentLeafComponent = require('./components/CommentLeafComponent.js');

setupRoutes(App);
setupControllers(App);