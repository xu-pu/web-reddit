'use strict';

var _ = require('underscore');

var STATE = require('../settings.js').ACCOUNT_STATE,
    Profile = require('../models/Profile.js'),
    utils = require('../utils.js');

module.exports = Ember.ObjectController.extend({

    uuid: null,

    loginURL: null,

    popup: null,

    prepare: function(){

        var clientID = 'WeVdB8YkKe-TJw',
            scopes = 'identity',
            callbackURL = 'http://reddit.localhost/oauth/callback',
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

    }.on('init'),

    actions: {

        loginPopup: function(){
            var _self = this;
            if (this.get('popup')) return;
            var handle = window.open(this.get('loginURL'), '_blank');
            if (!handle) return;
            this.set('popup', handle);
            setInterval(function(){
                if (handle.closed) {
                    _self.set('popup', null);
                }
            }, 500);
        },

        login: function(){
            var _self = this;
            jQuery.ajax({
                jsonp: 'jsonp',
                dataType: 'jsonp',
                type: 'POST',
                data: {
                    username: this.get('username'),
                    passwd: this.get('password'),
                    api_type: 'json'
                }
            }).then(function(resp){
                if (!_.isUndefined(resp.json)) {
                    _self.send('resume');
                }
                else {
                    _self.set('state', STATE.LOGGEDOUT);
                }
            });
        },

        resume: function(){
            var _self = this;
            jQuery.ajax('https://www.reddit.com/api/me.json', {
                jsonp: 'jsonp',
//                dataType: 'jsonp',
                dataType: 'json',
                type: 'GET'
            }).then(function(resp){
                console.log(resp);
                if (_.isUndefined(resp.data)) {
                    _self.set('state', STATE.LOGGEDIN);
                    _self.set('model', Profile.create(resp.data));
                }
                else {
                    _self.set('state', STATE.LOGGEDOUT);
                }
            });
        }

    }

});