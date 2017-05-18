import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  // Params
  instructors: [],

  orderedInstructors: computed('instructors.[]', 'instructors.@each.displayOrder', function() {
    return this.get('instructors').sortBy('displayOrder');
  }),

  actions: {
    reorder(orderedInstructors) {
      let sortOrder = 0;
      orderedInstructors.forEach(instructor => {
        instructor.set('displayOrder', sortOrder);
        sortOrder++;
      });
    }
  }
});
