import DS from 'ember-data';
import computed from 'ember-computed';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  lessonLevels: hasMany('lesson-level', {async: false}),
  lessonCategory: belongsTo('lesson-category'),

  lessonLevelList: computed('lessonLevels', function() {
    return this.get('lessonLevels').map(level => level.get('name')).join(', ');
  })
});
