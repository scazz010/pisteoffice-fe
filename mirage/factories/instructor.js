import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  displayOrder(i) {
    return i;
  },

  name: faker.name.findName,
  email: faker.internet.email
});
