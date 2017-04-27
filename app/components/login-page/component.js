import Component from 'ember-component';
import service from 'ember-service/inject';

export default Component.extend({
  session: service(),

  actions: {
    authenticate: function () {
      let credentials = this.getProperties('identification', 'password'),
        authenticator = 'authenticator:jwt-client';

      this.get('session').authenticate(authenticator, credentials);
    }
  }

});
