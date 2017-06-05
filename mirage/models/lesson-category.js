import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  lessonLevels: hasMany('lesson-level')
});
