'use strict';

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