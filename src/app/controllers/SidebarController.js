'use strict';

module.exports = Ember.Controller.extend({

    loginURL: function(){
        var clientID = 'WeVdB8YkKe-TJw',
            scopes = 'identity',
            callbackURL = 'http://reddit.ptx-root.me/oauth/callback';
        return 'https://ssl.reddit.com/api/v1/authorize?' +
            'client_id='+clientID+'&'+
            'response_type=code&'+
            'state='+'RANDOM_STRING'+'&'+
            'redirect_uri='+callbackURL+'&'+
            'duration=permanent&'+
            'scope='+scopes;
    }.property()

});