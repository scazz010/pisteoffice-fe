import Component from 'ember-component';
import computed from 'ember-computed';

import moment from 'moment';

export default Component.extend({
  // Params
  lesson: null,
  account: null,
  widthOf1MSInPx: 0,
  workingDayDurationInMS: 0,
  leftOffsetOfFirstTimeslot: 0,

  tagName: '',

  width: computed('lesson.duration', 'widthOf1MSInPx', function() {
    const lessonDuration = this.get('lesson.duration');
    const widthOf1MSInPx = this.get('widthOf1MSInPx');

    if (!lessonDuration || !widthOf1MSInPx) {
      return 0;
    }

    return lessonDuration * widthOf1MSInPx;
  }),

  offset: computed('leftOffsetOffFirstTimeslot', 'widthOf1MSInPx', 'lesson.startTime', function() {
    const durationBeforeLessonsBegin = moment.duration(this.get('account.workingDayStartTime'));

    const lessonStartTime = this.get('lesson.startTime');
    const startOfWeek =  lessonStartTime.clone().startOf('week');
    const startOfWorkingDay = lessonStartTime.clone().startOf('day').add(durationBeforeLessonsBegin);

    const daysSinceWeekStart = moment.duration(lessonStartTime - startOfWeek).days();

    const msSinceDayStart = moment.duration(lessonStartTime.clone().diff(startOfWorkingDay)).asMilliseconds();
    const workingMSSinceWeekStart = daysSinceWeekStart * this.get('account.workingDayDurationInMS') + msSinceDayStart;

    //console.log('days since start of week: ' + daysSinceWeekStart);
    //console.log('miliseconds since 8am: ' + msSinceDayStart);
    return this.get('leftOffsetOfFirstTimeslot') + workingMSSinceWeekStart * this.get('widthOf1MSInPx');
  }),

  lessonStyle: computed('offset', 'width', function() {
    return Ember.String.htmlSafe("left: " + this.get('offset') + "px; width: " + this.get('width') + "px");
  }),

  isGroupLesson: computed('lesson.category.lessonClass', function () {
    return this.get('lesson.category.lessonClass') === 'GROUP';
  })
});
