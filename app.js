// app.js
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Artist, Song, PopularSong } from './models';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/my-music-database';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(bodyParser.json());

// Add song to the playlist
app.post('/playlist/add', async (req, res) => {
  const { title, artists, album } = req.body;

  if (!title || !artists || !album) {
    return res.status(400).json({ error: 'Title, artists, and album are required' });
  }

  try {
    // Check if the artists already exist in the database, if not, create new artists
    const artistNames = Array.isArray(artists) ? artists : [artists];
    const artistPromises = artistNames.map(name => {
      return Artist.findOneAndUpdate(
        { name },
        { name },
        { upsert: true, new: true }
      );
    });
    const artistDocs = await Promise.all(artistPromises);

    // Create a new song with the provided details
    const song = new Song({
      title,
      artists: artistDocs.map(artist => artist._id),
      album,
    });

    // Save the new song to the database
    await song.save();

    res.json({ message: 'Song added to the playlist' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ... Other route handlers for playing a song, getting the playlist, and sorting by most played ...

app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));