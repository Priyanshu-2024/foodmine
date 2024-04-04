import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();



const dbConnect = () => {
    mongoose.connect("mongodb+srv://foodmine:ULCCBiOYThg57Oug@foodmine.tg6s45p.mongodb.net/", {

    })
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB:", error);
    });
};

export default dbConnect;
