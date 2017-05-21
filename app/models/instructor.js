import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  name: attr('string'),
  email: attr('string'),
  displayOrder: attr('number')
});
