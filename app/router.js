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

    this.route('calendar', { path: '/'}, function() {
      this.route('info', { path: '/:lesson_id'});
      this.route('new-lesson');
    });

    this.route('admin', function() {
      this.route('instructors', function() {
        this.route('new');
        this.route('edit', { path: '/:instructor_id' });
      });
      this.route('lesson', { path: '/lessons'}, function() {
        this.route('plans',  function() {});
        this.route('categories',  function() {
          this.route('edit', { path: '/:category_id' });
        });
        this.route('levels',  function() {});
      })

    });
  });
});

export default Router;
