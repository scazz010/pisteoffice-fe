import Route from 'ember-route';
import service from 'ember-service/inject'
import RSVP from 'rsvp';

export default Route.extend({
  moment: service(),

  beforeModel() {
    return this.get('moment').setTimeZone('Europe/Paris');
  },

  model() {
    return RSVP.hash({
      instructors: this.get('store').findAll('instructor'),
      account: this.get('store').createRecord('account')
    });
  },

  setupController(controller, model) {
    controller.setProperties(model);
    this._super(...arguments);
  }
});
