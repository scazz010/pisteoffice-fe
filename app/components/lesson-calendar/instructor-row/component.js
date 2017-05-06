import Component from 'ember-component';
import on from 'ember-evented/on';
import computed from 'ember-computed';

export default Component.extend({
  // Params
  account: null,
  instructor: null,
  lessons: [],

  // State
  leftOffsetOfFirstTimeslot: 0,
  rightOffsetOfLastTimeslot: 0,


  // CPs
  workingDayDurationInMS: computed.oneWay('account.workingDayDurationInMS'),
  pxOfCalendar: computed('leftOffsetOfFirstTimeslot', 'rightOffsetOfLastTimeslot', function() {
    return this.get('rightOffsetOfLastTimeslot') - this.get('leftOffsetOfFirstTimeslot');
  }),
  widthOf1MSInPx: computed('workingDayDurationInMS', 'pxOfCalendar', function() {
    const workingWeekInMS = this.get('account.workingDayDurationInMS') * 7;
    return this.get('pxOfCalendar') / workingWeekInMS;
  }),

  didInsertElement() {
    this.setCalendarRowOffsets();
  },
  debouncedDidResize() {
    this.setCalendarRowOffsets();
  },

  setCalendarRowOffsets() {
    const offset = Ember.$('.timePeriod:first')[0].getBoundingClientRect().left;
    this.set('leftOffsetOfFirstTimeslot', offset);

    const rightOffset =Ember.$('.timePeriod:last')[0].getBoundingClientRect().right;
    this.set('rightOffsetOfLastTimeslot', rightOffset);
  }

});
