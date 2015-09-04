import Ember from 'ember';

export default Ember.Component.extend({

    classNames: ['expansion-window'],

    actions: {
        close: function(){
            this.sendAction('close');
        }
    }

});
