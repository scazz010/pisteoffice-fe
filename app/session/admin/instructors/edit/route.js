import Route from 'ember-route';
import Changeset from 'ember-changeset';

export default Route.extend({
  controllerName: 'session.admin.instructors.new',

  model(params) {
    return this.store.findRecord('instructor', params.instructor_id);
  },

  setupController(controller, model) {
    controller.set('instructor', model);
    controller.set('instructorChangeset', new Changeset(model));
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
