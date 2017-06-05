import Route from 'ember-route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      categories: this.get('store').findAll('lesson-category')
    });
  },

  setupController(controller, model) {
    controller.setProperties(model);
    this._super(...arguments);
  }
})
