import Component from 'ember-component';

export default Component.extend({
  // Params
  model: [],
  reorder(orderedModel) {
    throw new Error("implement me");
  }

});
