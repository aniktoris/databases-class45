const { MongoClient, ServerApiVersion } = require('mongodb');

const { seedDatabase } = require('./seedDatabase.js');

require('dotenv').config();

async function createEpisodeExercise(client, episode) {
  const result = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .insertOne(episode);

  console.log(
    `Created season 9 episode 13 and the document got the id ${episode._id}`,
  );
}

async function findEpisodesExercises(client, queries = []) {
  for (const query of queries) {
    const result = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .findOne(query);

    const cursor = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .find(query);

    const results = await cursor.toArray();
    const newResults = results.map((result) => result.title).join(', ');

    if (query.episode === 'S02E02') {
      console.log(`The title of episode 2 in season 2 is ${result.title}`);
    } else if (query.title === 'BLACK RIVER') {
      console.log(
        `The season and episode number of the "BLACK RIVER" episode is ${result.episode}`,
      );
    } else if (query.elements.includes('CLIFF')) {
      console.log(
        `The episodes that Bob Ross painted a CLIFF are ${newResults}`,
      );
    }
  }
}

async function findAllEpisodesExercises(client, query = {}) {
  const cursor = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find(query);

  const results = await cursor.toArray();
  const newResults = results.map((result) => result.title).join(', ');

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${newResults}`,
  );
}

async function updateEpisodeExercises(client, episodeName, episodeUpdate) {
  const result = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateOne({ title: episodeName }, { $set: { title: episodeUpdate } });

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${result.modifiedCount} episodes`,
  );
}

async function updateManyEpisodeExercises(
  client,
  currentElement,
  updatedElement,
) {
  const results = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .updateMany(
      { elements: currentElement },
      { $set: { elements: updatedElement } },
    );

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${results.modifiedCount} episodes`,
  );
}

async function deleteEpisodeExercise(client, episodeNo) {
  const result = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .deleteOne({ episode: episodeNo });

  console.log(
    `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`,
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`,
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client, {
      episode: 'S09E13',
      title: 'MOUNTAIN HIDE-AWAY',
      elements: [
        'CIRRUS',
        'CLOUDS',
        'CONIFER',
        'DECIDIOUS',
        'GRASS',
        'MOUNTAIN',
        'MOUNTAINS',
        'RIVER',
        'SNOWY_MOUNTAIN',
        'TREE',
        'TREES',
      ],
    });

    // READ
    await findEpisodesExercises(client, [
      { episode: 'S02E02' },
      { title: 'BLACK RIVER' },
      { elements: 'CLIFF' },
    ]);

    await findAllEpisodesExercises(client, {
      elements: { $all: ['CLIFF', 'LIGHTHOUSE'] },
    });

    // UPDATE
    await updateEpisodeExercises(
      client,
      'BLUE RIDGE FALLERS',
      'BLUE RIDGE FALLS',
    );

    await updateManyEpisodeExercises(client, 'BUSHES', 'BUSH');

    // DELETE
    await deleteEpisodeExercise(client, 'S31E14');
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
