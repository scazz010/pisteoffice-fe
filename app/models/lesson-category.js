import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  displayOrder: attr('number'),
  lessonLevels: hasMany('lesson-level', {async: false}),
  lessonClass: attr('string'), // PRIVATE | GROUP

  minAttendees: attr('number'),
  maxAttendees: attr('number')
});
