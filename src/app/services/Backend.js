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

    }

});