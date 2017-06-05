import moment from 'moment';

function randomNumber(limit) {
  return Math.floor(Math.random() * limit);
}

function randomElement(array) {
  return array[randomNumber(array.length)];
}

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);

  let instructors = server.createList('instructor', 4);

  for (let i=0; i<10; i++) {
    const instructorId =  instructors[ randomNumber(instructors.length) ].id;
    const startTime = moment.utc().startOf('week').add(randomNumber(8), 'd');
    startTime.add(randomElement([8,12,13]), 'h');
    const endTime = startTime.clone().add(2, 'h');

    server.create('lesson', {
      instructorId: instructorId,
      startTime: startTime.format(),
      endTime: endTime.format()
    });
  }

  // const indiv = server.create('lesson-category', {name: 'individual'});
  // server.create('lesson-plan', {lessonCategory_id: indiv.id, name: 'test plan'});

  server.loadFixtures('lesson-plans');
  server.loadFixtures('lesson-categories');
  server.loadFixtures('lesson-levels');

}
