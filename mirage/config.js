import Mirage from 'ember-cli-mirage';
import Ember from 'ember';

export default function() {

  this.namespace = '/api';

  this.post('/token-auth', (schema, request) => {
    const req = JSON.parse(request.requestBody);
    const pw = Ember.get(req, 'password');

    if(pw === 'test1234') {
      return new Mirage.Response(201, {}, { token: 'hotdog' });
    } else {
      return new Mirage.Response(404, {}, req);
    }
  });

  this.get('/lessons', (schema) => {
    return schema.lessons.all();
  });
  this.get('lessons/:id');

  this.get('lesson-levels');
  this.get('lesson-levels/:id');
  this.get('lesson-categories');
  this.get('lesson-categories/:id');
  this.get('lesson-plans');
  this.get('lesson-plans/:id');

  this.get('/users');
  this.get('/users/:id');

  this.get('instructors');
  this.get('instructors/:id');
  this.post('/instructors'); // make displayOrder the bottom?
  this.patch('/instructors/:id');

  this.get('people');
  this.get('people/:id');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
