import ResizeAware from 'ember-resize/mixins/resize-aware';

import Component from 'ember-component';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import { task } from 'ember-concurrency';

export default Component.extend(ResizeAware, {
  // Params
  weekStartDate: null,
  instructors: null,
  account: null,

  // Services
  store: service(),

  // State
  rightOffsetOfLastTimeslot: 0,
  leftOffsetOfFirstTimeslot: 0,


  didReceiveAttrs({oldAttrs, newAttrs}) {
    if (!oldAttrs || oldAttrs.weekStartDate.value !== newAttrs.weekStartDate.value) {
      const weekStartDate = newAttrs.weekStartDate.value;
      const weekEndDate = weekStartDate.clone().add(1, 'week');

      this.get('updateLessonsFromServer').perform(weekStartDate.toJSON(), weekEndDate.toJSON());
    }
  },

  didInsertElement() {
    this.setCalendarRowOffsets();
    this._super(...arguments);
  },
  debouncedDidResize() {
    this.setCalendarRowOffsets();
  },
  setCalendarRowOffsets() {
    const offset = 200 + $(`#${this.get('elementId')}`)[0].getBoundingClientRect().left;
    this.set('leftOffsetOfFirstTimeslot', offset);

    const rightOffset = $(`#${this.get('elementId')}`)[0].getBoundingClientRect().right;
    this.set('rightOffsetOfLastTimeslot', rightOffset);
  },


  // CPs
  lessonsByInstructorId: computed('cachedLessons.[]', 'weekStartDate', function() {
    const weekStartDate = this.get('weekStartDate');
    const weekEndDate = weekStartDate.clone().add(1, 'week');

    let lessons = {};

    this.get('instructors').forEach(instructor => {
      lessons[instructor.get('id')] = [];
    });

    this.get('cachedLessons').filter(lesson => {
      let lessonStart = lesson.get('startTime');
      return true;
      //return lessonStart && lessonStart.isAfter(weekStartDate) && lessonStart.isBefore(weekEndDate);
    }).forEach(lesson => {
      const instructorId = lesson.get('instructor.id');
      lessons[instructorId].pushObject(lesson);
    });

    return lessons || {};
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
      let isFirstOfDay = true;

      while(timePeriod.hour() < dayEndHour) {
        timePeriods.push({
          startTime: timePeriod.clone(),
          isFirstOfDay: isFirstOfDay
        });

        timePeriod.add(1, 'h');
        isFirstOfDay = false;
      }
    });

    return timePeriods;
  }),

  workingDayDurationInMS: computed.oneWay('account.workingDayDurationInMS'),
  pxOfCalendar: computed('leftOffsetOfFirstTimeslot', 'rightOffsetOfLastTimeslot', function() {
    //console.log('recomputing fx of calendar');
    return this.get('rightOffsetOfLastTimeslot') - this.get('leftOffsetOfFirstTimeslot');
  }),
  widthOf1MSInPx: computed('workingDayDurationInMS', 'pxOfCalendar', function() {
    const workingWeekInMS = this.get('account.workingDayDurationInMS') * 7;

    return this.get('pxOfCalendar') / workingWeekInMS;
  }),

  // Tasks
  updateLessonsFromServer: task(function * (start, end) {
    return yield this.get('store').query('lesson', {
      before: end,
      after: start
    });
  })

});
