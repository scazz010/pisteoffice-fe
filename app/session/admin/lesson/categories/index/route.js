import Route from 'ember-route';


export default Route.extend({
  model() {
    return this.get('store').findAll('lesson-category')
  },

  setupController(controller, model) {
    controller.set('categories', model);
    this._super(...arguments);
  }
})
