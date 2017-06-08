import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  instructor: belongsTo(),
  category: belongsTo('lesson-category'),
  level: belongsTo('lesson-level'),
  pupils: hasMany('person')
});
