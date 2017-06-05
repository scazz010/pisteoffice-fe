import Component from 'ember-component';
import computed from 'ember-computed';

import ResizeAware from 'ember-resize/mixins/resize-aware';

export default Component.extend(ResizeAware, {
  // Params
  account: null,
  instructor: null,
  lessons: [],
  timePeriods: [],

  // HTML
  tagName: '',

  // State
  leftOffsetOfFirstTimeslot: 0,
  rightOffsetOfLastTimeslot: 0,


  // CPs
  workingDayDurationInMS: computed.oneWay('account.workingDayDurationInMS'),
  pxOfCalendar: computed('leftOffsetOfFirstTimeslot', 'rightOffsetOfLastTimeslot', function() {
    console.log('recomputing fx of calendar');
    return this.get('rightOffsetOfLastTimeslot') - this.get('leftOffsetOfFirstTimeslot');
  }),
  widthOf1MSInPx: computed('workingDayDurationInMS', 'pxOfCalendar', function() {
    const workingWeekInMS = this.get('account.workingDayDurationInMS') * 7;
    return this.get('pxOfCalendar') / workingWeekInMS;
  }),

  didInsertElement() {
    this.setCalendarRowOffsets();
    this._super(...arguments);
  },

  debouncedDidResize() {
    // maybe we could move this into the header - or somewhere where it's
    // only computed once, not for every instructor row
    this.setCalendarRowOffsets();
  },

  setCalendarRowOffsets() {
    const offset = Ember.$('.timePeriod:first')[0].getBoundingClientRect().left;
    this.set('leftOffsetOfFirstTimeslot', offset);

    const rightOffset =Ember.$('.timePeriod:last')[0].getBoundingClientRect().right;
    this.set('rightOffsetOfLastTimeslot', rightOffset);
  }

});
