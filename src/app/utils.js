'use strict';

var _ = require('underscore');

module.exports.promiseLoadedUrl = function(url){

    return new Promise(function(resolve, reject){

        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'blob';

        request.onabort = reject;
        request.onerror = reject;
        request.ontimeout = reject;

        request.onload = function(){
            resolve(URL.createObjectURL(request.response));
        };

        request.send();

    });

};


module.exports.promiseRedditListing = function(url, params){

    params = params || {};

    _.extend(params, {
        jsonp: 'jsonp',
        dataType: 'jsonp',
        type: 'GET'
    });

    return jQuery
        .ajax(url, params)
        .then(function(data){
            return data.data.children.map(function(entry){
                return entry.data;
            });
        });

};