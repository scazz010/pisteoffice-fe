import Route from 'ember-route';
import service from 'ember-service/inject';

export default Route.extend({
  session: service(),

  beforeModel() {
    this.get('session').invalidate();
  }
});
