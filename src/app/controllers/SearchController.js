'use strict';

module.exports = Ember.Controller.extend({

    keyword: '',

    candidates: [],

    currentTime: 0,

    onKeywordChange: function(){

        var timestamp = (new Date()).getTime(),
            _self = this;

        jQuery
            .ajax('/proxy/api/search_reddit_names.json', {
                dataType: 'json',
                method: 'POST',
                data: {
                    include_over_18: true,
                    query: this.get('keyword')
                }
            })
            .then(function(data){
                if (_self.get('keyword') && _self.get('currentTime') < timestamp) {
                    _self.set('candidates', data.names);
                    _self.set('currentTime', timestamp);
                }
            });

    }.observes('keyword')

});