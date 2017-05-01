import Component from 'ember-component';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import { task } from 'ember-concurrency';

export default Component.extend({
  // Params
  weekStartDate: null,
  instructors: null,

  // Services
  store: service(),

  didReceiveAttrs({oldAttrs, newAttrs}) {

    if (!oldAttrs || oldAttrs.weekStartDate.value !== newAttrs.weekStartDate.value) {
      const weekStartDate = newAttrs.weekStartDate.value;
      const weekEndDate = weekStartDate.clone().add(1, 'week');

      this.get('updateLessonsFromServer').perform(weekStartDate.toJSON(), weekEndDate.toJSON());
    }
  },

  // CPs
  lessons: computed('cachedLessons.[]', 'weekStartDate', function() {
    const weekStartDate = this.get('weekStartDate');
    const weekEndDate = weekStartDate.clone().add(1, 'week');

    return this.get('cachedLessons').filter(lesson => {
      let lessonStart = lesson.get('startTime');
      return true;
      //return lessonStart && lessonStart.isAfter(weekStartDate) && lessonStart.isBefore(weekEndDate);
    });
  }),

  cachedLessons: computed(function() {
    return this.get('store').peekAll('lesson');
  }),

  daysOfWeek: computed('weekStartDate', function() {
    const weekStartDate = this.get('weekStartDate');
    if (! weekStartDate) {
      return [];
    }
    let currentDate = weekStartDate.clone();
    let daysOfWeek = [];

    for (var i = 0; i < 7; i++) {
      daysOfWeek.push(currentDate.clone());
      currentDate.add(1, 'day');
    }

    return daysOfWeek;
  }),

  timePeriods: computed('daysOfWeek', function() {
    const daysOfWeek = this.get('daysOfWeek');
    const dayStartHour = 8;
    const dayEndHour = 17;

    let timePeriods = [];


    daysOfWeek.forEach(weekDay => {
      let timePeriod = weekDay.clone().hour(dayStartHour);

      while(timePeriod.hour() < dayEndHour) {
        timePeriods.push(timePeriod.clone());
        timePeriod.add(1, 'h');
      }
    });

    return timePeriods;
  }),

  // Tasks
  updateLessonsFromServer: task(function * (start, end) {
    return yield this.get('store').query('lesson', {
      before: end,
      after: start
    });
  })

});
