'use strict';

var _ = require('underscore');

var STATE = require('../settings.js').ACCOUNT_STATE,
    Profile = require('../models/Profile.js');

module.exports = Ember.ObjectController.extend({

    state: STATE.UNKNOWN,

    username: null,

    password: null,

    actions: {

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