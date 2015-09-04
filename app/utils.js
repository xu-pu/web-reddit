import _ from 'npm:underscore';
import Link from './models/link';
import Comment from './models/comment';
import Subreddit from './models/content-subreddit';
import settings from './settings';

var TYPES = settings.CONTENT_TYPES;

export default {
  convertRedditThing: convertRedditThing,
  promiseLoadedUrl: promiseLoadedUrl,
  promiseJson: promiseJson,
  promiseRedditListing: promiseRedditListing,
  getRandomString: getRandomString
};


function convertRedditThing(thing){

    var ThingType;

    switch (thing.kind) {
        case TYPES.LINK:
            ThingType = Link;
            break;
        case TYPES.COMMENT:
            ThingType = Comment;
            break;
        case TYPES.SUBREDDIT:
            ThingType = Subreddit;
            break;
        default:
            throw 'Invalid reddit thing type';
    }

    return ThingType.create(thing.data);

}


function promiseLoadedUrl(url){

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

}


function promiseJson(url, params){

    params = params || {};

    _.extend(params, {
        jsonp: 'jsonp',
        dataType: 'jsonp',
        type: 'GET'
    });

    return jQuery.ajax(url, params);

}


function promiseRedditListing(url, params){

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

}


function getRandomString(len){
    var str = '';
    var pos;
    for (pos=0; pos<len; pos++) {
        str += Math.round(Math.random()*10);
    }
    return str;
}
