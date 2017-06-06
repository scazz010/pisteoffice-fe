import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  instructor: belongsTo(),
  category: belongsTo('lesson-category'),
  level: belongsTo('lesson-level')
});
