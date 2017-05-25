import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('index');
  this.route('session', { path: '/'}, function() {
    this.route('logout');

    this.route('calendar', { path: '/'} );

    this.route('admin', function() {
      this.route('instructors', function() {
        this.route('new');
        this.route('edit', { path: '/:instructor_id' });
      });
    })
  });
});

export default Router;
