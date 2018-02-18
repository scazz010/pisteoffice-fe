import Route from 'ember-route';
import RSVP from 'rsvp';
import Changeset from 'ember-changeset';

export default Route.extend({

  model(params) {
    const instructors = this.store.findAll('instructor');
    const categories = this.store.findAll('lesson-category');

    return RSVP.hash({
      instructors,
      categories
    }).then((promiseHash) => {
      const lessonModel = this.store.createRecord('lesson');
      const lesson = new Changeset(lessonModel);
      lesson.set('instructor', this.store.peekRecord('instructor', params.instructor));
      return Object.assign({}, promiseHash, {lesson});
    });
  }
});
