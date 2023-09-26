import mongoose from "mongoose";
const connectDB = async () => {
    try {
        // Ensure that MONGO_URL is defined
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL environment variable is not defined.");
        }
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB`);
    }
    catch (error) {
        console.error(`Error in MongoDB connection: ${error}`);
        throw error;
    }
};
export default connectDB;
