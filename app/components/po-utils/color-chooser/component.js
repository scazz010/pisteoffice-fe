import Component from 'ember-component';

export default Component.extend({
  color: 'blue',
  onChange: () => { },
  basicDropdown: {},

  availableColors: ['dodgerblue', 'blue', 'BlueViolet', 'DarkBlue', 'DarkMagenta', 'DarkOrchid', 'deepskyblue', 'lightskyblue', 'midnightblue', 'navy', 'slateblue'],

  actions: {
    registerAPI(api) {
      this.set('basicDropdown', api)
    },

    onChange() {
      this.onChange(...arguments);
      this.get('basicDropdown').actions.close();
    }
  }

});
