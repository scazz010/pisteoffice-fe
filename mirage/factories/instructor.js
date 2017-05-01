import { Factory, trait, association } from 'ember-cli-mirage';

export default Factory.extend({
  displayOrder(i) {
    return i;
  },

  user: association(),

  withUser: trait({
    afterCreate(instructor, server) {
      server.create('user', { instructor })
    }
  })
});
