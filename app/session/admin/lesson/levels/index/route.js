import Route from 'ember-route';


export default Route.extend({
  model() {
    return this.get('store').findAll('lesson-level')
  },

  setupController(controller, model) {
    controller.set('levels', model);
    this._super(...arguments);
  }
})
