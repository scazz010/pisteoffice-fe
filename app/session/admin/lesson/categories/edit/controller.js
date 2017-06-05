import Controller from 'ember-controller';
import computed from 'ember-computed';

export default Controller.extend({
  // params
  category: null,

  pageTitle: computed('category.name', 'category.lessonClass', function() {
    return `${this.get('category.name')} (${this.get('category.lessonClass')})`;
  }),

  lessonClassOptions: ['PRIVATE', 'GROUP'],

  actions: {
    onLevelColorChange(level, newColor) {
      level.set('color', newColor);
    }
  }
})
