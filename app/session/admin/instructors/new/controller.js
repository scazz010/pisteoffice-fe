import Controller from 'ember-controller';
import Changeset from 'ember-changeset';

export default Controller.extend({
  instructorChangeset: null,

  actions: {
    createInstructor() {
      this.get('instructorChangeset').save().then(() => {
        this.transitionToRoute('session.admin.instructors');
      });
    }
  }


});
