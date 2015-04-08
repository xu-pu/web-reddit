"use strict";

module.exports = Ember.Service.extend({

    token: null,

    ajax: function(url, data){

        var params;

        if (this.get('token')) {
            params = {
                headers: {
                    Authorization: 'bearer ' + this.get('token')
                }
            };
        }
        else {
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