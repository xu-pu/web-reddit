'use strict';

var setupControllers = require('./controllers.js'),
    setupRoutes = require('./router.js'),
    setupViews = require('./views.js');

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


setupRoutes(App);
setupControllers(App);
setupViews(App);