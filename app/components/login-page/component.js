import Component from 'ember-component';
import service from 'ember-service/inject';

// TODO: add spinner & ember-concurrency

export default Component.extend({
  tagName: '',

  session: service(),

  // state
  error: false,

  actions: {
    authenticate: function () {
      let credentials = this.getProperties('identification', 'password'),
        authenticator = 'authenticator:jwt-client';

      this.set('error', false);
      this.get('session').authenticate(authenticator, credentials).catch(error => {
        this.set('error', true)
      });
    }
  }

});
