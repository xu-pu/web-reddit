import Ember from 'ember';

export default Ember.Component.extend({

    listing: null, // need

    stream: Ember.computed.alias('listing.list'),

    isLoading: Ember.computed.alias('listing.isLoading'),

    isEnd: Ember.computed.alias('listing.isEnd'),

    tagName: 'div',

    classNames: ['subreddit__feed-grid'],

    onChangeSize: function(){
        this.send('organize');
    }.observes('stream.length'),

    actions: {

        organize: function(){
            Ember.run.once(this, 'reorganize');
        },

        more: function(){
            if (!this.get('isEnd')) {
                this.get('listing').more();
            }
        },

        enter: function(model){
            this.sendAction('enter', model);
        }

    },

    reorganize: function(){
        jQuery('.js__grid-tile').wookmark({
            container: jQuery('.js__feed-grid', this.get('element')),
            align: 'center',
            offset: 15
        });
    }.on('didInsertElement')

});
