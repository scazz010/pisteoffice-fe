import DS from 'ember-data';
import computed from 'ember-computed';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  instructor: belongsTo('instructor'),
  startTime: attr('moment'),
  endTime: attr('moment'),

  duration: computed('startTime', 'endTime', function() {
    const startTime = this.get('startTime');
    const endTime = this.get('endTime');

    if (!startTime || !endTime) {
      return 0;
    }

    return endTime.diff(startTime);
  })
});
