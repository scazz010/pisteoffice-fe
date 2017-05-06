import Route from 'ember-route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {

    model() {
      return RSVP.hash({
        account: this.get('store').createRecord('account')
      });
    },

    setupController(controller, model) {
      controller.setProperties(model);
      this._super(...arguments);
    }

  }
);
