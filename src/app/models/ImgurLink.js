"use strict";

var urlUtils = require('url');

var albumPattern = /^\/a\/(.*)\/?$/;
var singlePattern = /^\/(?:gallery\/)(.*)\/?$/;

module.exports = Ember.Object.extend({

    url: null,

    isAlbum: false,

    isImage: false,

    embeded: null,

    onInit: function(){

        var _self = this,
            url = this.get('url'),
            parsed = urlUtils.parse(url),
            host = parsed.host,
            path = parsed.pathname,
            match, id;

        if (!host.match(/imgur\.com/)) { return null; }

        match = path.match(albumPattern);
        if (match) {
            id = match[1];
            parsed.path = '/a/'+id+'/embed';
            _self.setProperties({
                id: id,
                isAlbum: true,
                embeded: url.format(parsed)
            });
        }
        else {
            match = path.match(singlePattern);
            if (match) {
                id = match[1];
                _self.setProperties({
                    id: id,
                    isImage: true
                });
            }
        }

    }.on('init')

});