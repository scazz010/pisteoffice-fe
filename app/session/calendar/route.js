import Route from 'ember-route';
import service from 'ember-service/inject'

export default Ember.Route.extend({
  moment: service(),

  beforeModel() {
    return this.get('moment').setTimeZone('Europe/Paris');
  },

  model() {
    return this.get('store').findAll('lesson');
  }
});
