import Component from 'ember-component';

export default Component.extend({
  text: 'Add',

  onAdd() {
    throw new Error("Implement me!");
  }
})
