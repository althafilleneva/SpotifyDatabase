import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/my-music-database'; // Replace with your MongoDB connection string

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successfully connected to MongoDB');
});

export default db;
