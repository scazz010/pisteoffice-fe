import DS from 'ember-data';
import computed from 'ember-computed';

import moment from 'moment';

const { Model } = DS;

export default Model.extend({
  workingDayStartTime: '8:00',
  workingDayEndTime: '17:00',

  workingDayDurationInMS: computed('workingDayStartTime', 'workingDayEndTime', function() {
    const startTime = moment.duration(this.get('workingDayStartTime'));
    const endTime = moment.duration(this.get('workingDayEndTime'));

    return endTime.subtract(startTime).asMilliseconds();
  })

});
