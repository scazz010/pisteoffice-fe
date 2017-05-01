import Controller from 'ember-controller';
import computed from 'ember-computed';
import service from 'ember-service/inject';

export default Controller.extend({
  queryParams: ['weekStart'],

  // Services
  moment: service(),

  // State
  weekStart: null,

  weekStartDate: computed('weekStart', function() {
    return this.get('moment').moment().startOf('week');
  })
});
