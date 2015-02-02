'use strict';

module.exports = Ember.Controller.extend({

    needs: ['account', 'search'],

    account: Ember.computed.alias('controllers.account')

});