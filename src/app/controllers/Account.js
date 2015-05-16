'use strict';

var _ = require('underscore');

var utils = require('../utils.js'),
    Profile = require('../models/Profile.js');

module.exports = Ember.Controller.extend({

    backend: Ember.inject.service(),

    isResuming: false,

    isAuthenticating: false,

    token: Ember.computed.alias('backend.token'),

    oauth: null,

    model: Ember.computed.alias('profile'),

    profile: null,

    uuid: null,

    loginURL: null,

    resume: function(){

        var clientID = 'WeVdB8YkKe-TJw',
            scopes = [
                'identity',
                'vote',
                'save',
                'read',
                'mysubreddits'
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

        var oauthStr = localStorage.getItem('oauth');

        if (oauthStr) {
            this.set('oauth', JSON.parse(oauthStr));
            this.promiseResume();
        }

    }.on('init'),


    promiseResume: function(){

        if (this.get('profile')) return Promise.resolve();
        if (this.promised) return this.promised;

        var _self = this,
            oauth = this.get('oauth');

        if (!oauth) { return Promise.reject(); }

        this.set('isResuming', true);

        this.promised = Promise.resolve()
            .then(function(){
                // refresh token
                return jQuery.ajax('/refresh_token', {
                    method: 'POST',
                    data: {
                        'grant_type': 'refresh_token',
                        'refresh_token': oauth['refresh_token']
                    }
                });
            }, failureHandler)
            .then(function(resp){
                // token refreshed, resume profile
                var token = resp['access_token'];
                _self.set('token', token);
                return jQuery.ajax('/reddit/api/v1/me', { headers: { Authorization: 'bearer ' + token } });
            }, failureHandler)
            .then(function(data){
               // profile resumed
                _self.setProperties({
                    isResuming: false,
                    profile: Profile.create(data)
                });
            });

        return this.promised;

        function failureHandler(e){
            console.log(e);
            _self.setProperties({
                isResuming: false
            });
            delete _self.promised;
        }

    },


    saveOauth: function(){
        var oauth = this.get('oauth');
        if (oauth) {
            localStorage.setItem('oauth', JSON.stringify(oauth));
        }
        else {
            localStorage.removeItem('oauth');
        }
    }.observes('oauth'),


    actions: {

        login: function(){

            var _self = this,
                MAX_TRIALS = 20,
                counter = 0;

            _self.set('isAuthenticating', true);

            attempt();

            function attempt(){
                jQuery.ajax('/api/oauth/token', { data: { uuid: _self.get('uuid') } })
                    .then(
                    function(data){
                        _self.setProperties({
                            isAuthenticating: false,
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
                            _self.set('isAuthenticating', false);
                        }
                    });
            }

        },

        'delete': function(){
            if (confirm('Do you want to logout?')) {
                this.send('logout');
            }
        },

        logout: function(){
            this.setProperties({
                token: null,
                oauth: null,
                profile: null
            });
        }

    }

});