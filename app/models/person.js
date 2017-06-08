import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  email: attr('string'),
  phoneNumber: attr('string'),

  lessons: hasMany('lesson')
});
