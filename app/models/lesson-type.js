import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name: attr('string'),
  defaultStartTime: attr('moment'),
  defaultEndTime: attr('moment'),

  lessonClass: attr('string'), // GROUP || PRIVATE
  maxAttendees: attr('number'),
  minAttendees: attr('number')
});
