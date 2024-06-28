import mongoose from 'mongoose';

export const connectDB = async () => {
    const dbUrl = process.env.DATABASE_URL_TEST;
    if(!dbUrl){
        console.log(dbUrl+' DATABASE is not defined in the environment variables')
        process.exit(1);
    }
  try {
    await mongoose.connect(dbUrl)
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
