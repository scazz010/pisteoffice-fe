import Component from 'ember-component';

export default Component.extend({
  //Params:
  options: [],
  selected: null,

  tagName: '',


  actions: {
    onChange(newVal) {
      this.set('selected', newVal);
      this.get('basicDropdown').actions.close();
    },

    registerAPI(api) {
      this.set('basicDropdown', api)
    }
  }

});
