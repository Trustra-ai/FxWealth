// Set strictQuery globally for Mongoose 7+
mongoose.set('strictQuery', true);

// Connect to MongoDB (no options object)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
