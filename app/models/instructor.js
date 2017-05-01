import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  user: belongsTo('user'),
  displayOrder: attr('number')
});
