import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Function to connect to database
const connectMongoDB = async () => {
  try {
    const response = await mongoose.connect(process.env.URI_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to database.');
  } catch (err) {
    console.error('Unable to connect to database', err);
    process.exit(1);
  }
};

// Invoke function to connect to database
connectMongoDB();

export default mongoose.connection;
