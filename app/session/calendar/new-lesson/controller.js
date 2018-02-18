import Controller from 'ember-controller';
import computed from 'ember-computed';
import service from 'ember-service/inject';

export default Controller.extend({
  queryParams: ['instructor'],
  instructor: null,

  routing: service('-routing'),

  actions: {
    onClose() {
      this.get('routing').router.transitionTo('session.calendar');
    },

    undo() {
      const lesson = this.get('model.lesson');
      debugger;
    }
  }

});
