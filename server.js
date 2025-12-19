mongoose.connect(process.env.MONGO_URI, {
  dbName: 'TrustraFx',
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
