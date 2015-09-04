import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend();

Router.map(function() {

  this.route('welcome');
  this.route('home');
  this.route('subreddit', { path: '/r/:name' }, function(){
    this.route('post', { path: '/:post'});
  });
  this.route('mine', { path: '/mine/:name'}, function(){
    this.route('post', { path: '/:post'});
  });

});

export default Router;
