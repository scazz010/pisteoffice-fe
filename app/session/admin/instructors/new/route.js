import Route from 'ember-route';
import Changeset from 'ember-changeset';

export default Route.extend({
  model() {
    return {
      instructor: this.store.createRecord('instructor'),
    }
  },

  setupController(controller, model) {

    controller.setProperties(model);
    controller.set('instructorChangeset', new Changeset(model.instructor));
    this._super(...arguments);
  },

  actions: {
    willTransition(transition) {
      if (this.controller.get('instructorChangeset.isPristine')) {
        this.controller.get('instructor').rollbackAttributes();
      }

    }
  }
});
