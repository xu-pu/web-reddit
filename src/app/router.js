"use strict";

module.exports = function(App){

    App.Router.map(function() {
        this.route('welcome');
        this.route('index', { path: '/'});
    });

    App.ApplicationRoute = Ember.Route.extend();

    App.IndexRoute = Ember.Route.extend();

};