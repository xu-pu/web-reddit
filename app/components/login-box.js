import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'div',

    classNames: 'login-box',

    popup: null,

    account: null, //need

    actions: {

        closePopup: function(){
            var popup = this.get('popup');
            if (popup) {
                popup.close();
                this.set('popup', null);
            }
        },

        loginPopup: function(){

            if (this.get('popup')) { return; }

            var _self = this,
                handle = window.open(this.get('account.loginURL'), '_blank');

            if (!handle) { return; }

            this.set('popup', handle);

            var timer = setInterval(function(){
                if (handle.closed) {
                    clearInterval(timer);
                    _self.set('popup', null);
                    _self.get('account').send('login');
                }
            }, 500);

        }

    }

});
