import Route from 'ember-route';


export default Route.extend({
  model() {
    return this.get('store').findAll('instructor')
  },

  setupController(controller, model) {
    controller.set('instructors', model);
    this._super(...arguments);
  }
})
