import Component from 'ember-component';

export default Component.extend({
  // Params
  model: [],
  editRoute: null,
  reorder(orderedModel) {
    throw new Error("implement me");
  }

});
