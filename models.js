import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  genres: { type: [String], required: true },
});

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  album: { type: String, required: true },
});

const popularSongSchema = new mongoose.Schema({
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
  playCount: { type: Number, default: 0 },
  period: { type: String, required: true },
});

const Artist = mongoose.model('Artist', artistSchema);
const Song = mongoose.model('Song', songSchema);
const PopularSong = mongoose.model('PopularSong', popularSongSchema);

export { Artist, Song, PopularSong };