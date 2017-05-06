import moment from 'moment';
import { Factory, trait, association } from 'ember-cli-mirage';

export default Factory.extend({
  startTime() {
    return 'test123';
  }
});
