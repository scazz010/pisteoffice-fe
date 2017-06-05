import Route from 'ember-route';
import Changeset from 'ember-changeset';

export default Route.extend({
  model(params) {
    return this.store.findRecord('lesson-category', params.category_id);
  },

  setupController(controller, model) {
    controller.set('category', model);
    controller.set('changeset', new Changeset(model));
    this._super(...arguments);
  }
})
