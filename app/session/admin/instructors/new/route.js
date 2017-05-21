import Route from 'ember-route';
import Changeset from 'ember-changeset';

export default Route.extend({
  model() {
    const user = this.store.createRecord('user');
    return {
      instructor: this.store.createRecord('instructor', {user: user}),
      user: user
    }
  },

  setupController(controller, model) {

    controller.setProperties(model);
    controller.set('instructorChangeset', new Changeset(model.instructor));
    controller.set('userChangeset', new Changeset(model.user));
    this._super(...arguments);
  },

  actions: {
    willTransition(transition) {
      debugger;
      if (this.controller.get('instructorChangeset.isPristine')) {

        this.controller.get('instructor').rollbackAttributes();
      }

    }
  }
});
