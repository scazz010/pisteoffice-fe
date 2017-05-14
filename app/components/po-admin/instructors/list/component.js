import Component from 'ember-component';

export default Component.extend({
  // Params
  instructors: [],

  actions: {
    reorder(orderedInstructors) {
      throw new Error("implement me");
    }
  }
});
