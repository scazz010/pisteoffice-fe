import Route from 'ember-route';


export default Route.extend({
  model() {
    return this.get('store').findAll('lesson-type')
  },

  setupController(controller, model) {
    controller.set('lessonTypes', model);
    this._super(...arguments);
  }
})
