import Route from 'ember-route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('lesson', params.lesson_id)
  }
})
