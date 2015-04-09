"use strict";

module.exports = Ember.Service.extend({

    token: null,

    ajax: function(url, data){

        var params;

        if (this.get('token')) {
            url = '/reddit' + url;
            params = {
                headers: {
                    Authorization: 'bearer ' + this.get('token')
                }
            };
        }
        else {
            url = 'https://reddit.com' + url;
            params = {
                jsonp: 'jsonp',
                dataType: 'jsonp',
                type: 'GET'
            };
        }

        params.data = data || {};

        return jQuery.ajax(url, params);

    },

    promiseSave: function(content, unsave){

        if (!this.get('token')) {
            return Promise.reject();
        }

        var params, url = '/reddit' + '/api/' + (unsave ? 'unsave' : 'save');

        params = {
            headers: {
                Authorization: 'bearer ' + this.get('token')
            },
            method: 'POST',
            data: {
                id: content.get('fullname')
            }
        };

        return jQuery.ajax(url, params);

    },

    promiseUnsave: function(content){

        if (!this.get('token')) {
            return Promise.reject();
        }

        var params, url = '/reddit' + '/api/unsave';

        params = {
            headers: {
                Authorization: 'bearer ' + this.get('token')
            },
            method: 'POST',
            data: {
                id: content.get('fullname')
            }
        };

        return jQuery.ajax(url, params);

    },

    promiseVote: function(){}

});