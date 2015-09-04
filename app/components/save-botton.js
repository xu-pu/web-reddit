import Ember from 'ember';

export default Ember.Component.extend({

    content: null, //need

    classNameBindings: ['savePending:is-pending', 'saved:is-on'],

    classNames: 'save-button',

    backend: Ember.inject.service(),

    savePending: Ember.computed.alias('content.savePending'),

    saved: Ember.computed.alias('content.saved'),

    click: function(){
        this.send('toggleSave');
    },

    actions: {
        toggleSave: function(){
            if (this.get('savePending')) {
                return;
            }
            var _self = this;
            this.set('savePending', true);
            this.get('backend')
                .promiseSave(this.get('content'), this.get('saved'))
                .then(function(){
                    _self.set('savePending', false);
                    _self.toggleProperty('saved');
                }, function(){
                    _self.set('savePending', false);
                });
        }
    }

});
