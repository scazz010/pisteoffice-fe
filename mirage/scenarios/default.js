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

  const numberOfLessons = 10;
  const numberOfStudents = 10;

  let instructors = server.createList('instructor', 4);
  server.loadFixtures('lesson-plans');
  server.loadFixtures('lesson-categories');
  server.loadFixtures('lesson-levels');


  /*
   * Make one group lesson for 2nd instructor for 5 days at 9AM
   * with 5 people
   */
  const startTime = moment.utc().startOf('week').add(randomNumber(1), 'd').hour(9).minute(0);
  let pupils = server.createList('person', 5);
  for (let i = 0; i < 5; i++) {
    server.create('lesson', {
      instructorId: 2,
      startTime: startTime.format(),
      endTime: startTime.clone().add(3, 'h'),
      categoryId: 2,
      levelId: 1,
      pupils: pupils
    });
    startTime.add(1, 'd');
  }


  for (let i = 0; i < numberOfLessons; i++) {
    const instructorId = instructors[randomNumber(instructors.length)].id;
    const startTime = moment.utc().startOf('week').add(randomNumber(8), 'd');
    startTime.add(randomElement([8, 12, 13]), 'h');
    const endTime = startTime.clone().add(2, 'h');

    const lesson = server.create('lesson', {
      instructorId: instructorId,
      startTime: startTime.format(),
      endTime: endTime.format(),
      categoryId: randomElement([1, 2, 3]),
      levelId: randomElement([1, 2, 3, 4, 5, 6, 7])
    });
  }
}
