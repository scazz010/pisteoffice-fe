import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  lessonCategory: belongsTo('lesson-category'),
  lessonLevels: hasMany('lesson-level')
});
