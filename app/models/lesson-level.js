import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  level: attr('number'),
  description: attr('string'),
  displayOrder: attr('number'),
  color: attr('string')
});
