'use strict';

var _ = require('underscore');

var utils = require('../utils.js'),
    Profile = require('../models/Profile.js');

module.exports = Ember.Controller.extend({

    backend: Ember.inject.service(),

    isFetchingProfile: false,

    isFetchingToken: false,

    token: Ember.computed.alias('backend.token'),

    oauth: null,

    model: Ember.computed.alias('profile'),

    profile: null,

    uuid: null,

    loginURL: null,

    popup: null,

    resume: function(){

        var clientID = 'WeVdB8YkKe-TJw',
            scopes = [
                'identity',
                'save',
                'read',
                'subscribe',
                'mysubreddits',
                'history'
            ].join(','),
            callbackURL = 'http://reddit.localhost/api/oauth/callback',
            uuid = utils.getRandomString(30),
            url = 'https://ssl.reddit.com/api/v1/authorize?' +
                'client_id='+clientID+'&'+
                'response_type=code&'+
                'state='+uuid+'&'+
                'redirect_uri='+callbackURL+'&'+
                'duration=permanent&'+
                'scope='+scopes;

        this.setProperties({
            uuid: uuid,
            loginURL: url
        });

        this.promiseResume();

    }.on('init'),


    promiseResume: function(){

        if (this.get('profile')) return Promise.resolve();
        if (this.promised) return this.promised;

        var _self = this,
            oauthStr = localStorage.getItem('oauth'),
            oauth;

        if (oauthStr) {
            oauth = JSON.parse(oauthStr);
            this.set('oauth', oauth);
        }
        else {
            return Promise.reject();
        }

        this.promised = Promise.resolve()
            .then(function(){
                // refresh token
                _self.set('isRefreshingToken', true);
                //console.log('refresh');
                return jQuery.ajax('/refresh_token', {
                    method: 'POST',
                    data: {
                        'grant_type': 'refresh_token',
                        'refresh_token': oauth['refresh_token']
                    }
                });
            }, failureHandler)
            .then(function(resp){
                //console.log('refreshed');
                // token refreshed, resume profile
                var token = resp['access_token'];
                _self.set('token', token);
                _self.set('isRefreshingToken', false);
                _self.set('isFetchingProfile', true);
                return jQuery.ajax('/reddit/api/v1/me', { headers: { Authorization: 'bearer ' + token } });
            }, failureHandler)
            .then(function(data){
               // profile resumed
                _self.setProperties({
                    isFetchingProfile: false,
                    profile: Profile.create(data)
                });
            });

        return this.promised;

        function failureHandler(e){
            console.log(e);
            _self.setProperties({
                isFetchingProfile: false,
                isRefreshingToken: false
            });
            delete _self.promised;
        }

    },


    saveOauth: function(){
        var oauth = this.get('oauth');
        if (oauth) {
            localStorage.setItem('oauth', JSON.stringify(oauth));
        }
    }.observes('oauth'),


    actions: {

        closePopup: function(){
            var popup = this.get('popup');
            if (popup) {
                popup.close();
                this.set('popup', null);
            }
        },

        loginPopup: function(){

            if (this.get('popup')) return;

            var _self = this,
                handle = window.open(this.get('loginURL'), '_blank');

            if (!handle) return;

            this.set('popup', handle);

            var timer = setInterval(function(){
                if (handle.closed) {
                    clearInterval(timer);
                    _self.set('popup', null);
                    _self.send('login');
                }
            }, 500);

        },

        login: function(){

            var _self = this,
                MAX_TRIALS = 20,
                counter = 0;

            _self.set('isFetchingToken', true);

            attempt();

            function attempt(){
                jQuery.ajax('/api/oauth/token', { data: { uuid: _self.get('uuid') } })
                    .then(
                    function(data){
                        _self.setProperties({
                            isFetchingToken: false,
                            oauth: data
                        });
                        _self.promiseResume();
                    },
                    function(){
                        counter++;
                        if (counter < MAX_TRIALS) {
                            setTimeout(function(){ attempt(); }, 1000);
                        }
                        else {
                            _self.set('isFetchingToken', false);
                        }
                    });
            }

        },

        logout: function(){
            this.setProperties({
                token: null,
                model: null
            });
        }

    }

});