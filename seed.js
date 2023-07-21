import faker from 'faker';
import { Artist, Song, PopularSong } from './models';
import db from './db';

async function populateDatabase() {
  await db;

  // Populate Artists collection
  const artists = [];
  for (let i = 0; i < 10; i++) {
    const genres = [faker.music.genre(), faker.music.genre(), faker.music.genre()];
    artists.push({
      name: faker.name.findName(),
      dateOfBirth: faker.date.past(),
      genres,
    });
  }
  await Artist.insertMany(artists);

  // Populate Songs collection
  const songs = [];
  const allArtists = await Artist.find();
  for (let i = 0; i < 10; i++) {
    const artist = faker.random.arrayElement(allArtists);
    songs.push({
      title: faker.lorem.words(),
      artist: artist._id,
      album: faker.lorem.words(),
    });
  }
  await Song.insertMany(songs);

  // Populate Popular Songs collection
  const popularSongs = [];
  const allSongs = await Song.find();
  const periods = ['last week', 'last month', 'last year'];
  for (let i = 0; i < 10; i++) {
    const song = faker.random.arrayElement(allSongs);
    popularSongs.push({
      song: song._id,
      playCount: faker.random.number(1000),
      period: faker.random.arrayElement(periods),
    });
  }
  await PopularSong.insertMany(popularSongs);

  console.log('Database populated successfully.');
}

populateDatabase().then(() => process.exit());
