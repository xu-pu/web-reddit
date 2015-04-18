var _  = require('underscore'),
    utils = require('../utils.js');

module.exports = Ember.Component.extend({

    link: null,

    comments: null,

    classNames: ['subreddit__post-container'],

    requestID: null,

    isLoadingComments: function(){
        return !!this.get('requestID');
    }.property('requestID'),

    loadComments: function(){

        this.set('comments', null);

        var requestID = _.uniqueId(),
            subredditName = this.get('link.subreddit.'),
            postID = this.get('link.id'),
            _self = this;

        _self.set('requestID', requestID);

        return utils
            .promiseJson('https://reddit.com/r/' + subredditName + '/comments/' + postID + '.json')
            .then(
            function(data){
                if (_self.get('requestID') === requestID) {
                    var comments = data[1].data.children;
                    _self.set('comments', comments);
                    _self.set('requestID', null);
                }
            },
            function(){
                console.log('loading failed');
                _self.loadComments();
            }
        );

    }.observes('link').on('init')

});