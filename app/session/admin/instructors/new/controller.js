import Controller from 'ember-controller';

export default Controller.extend({
  instructorChangeset: null,

  actions: {
    saveInstructor() {
      this.get('instructorChangeset').save().then(() => {
        this.transitionToRoute('session.admin.instructors');
      });
    }
  }


});
