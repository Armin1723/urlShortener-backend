require('dotenv').config()
const mongoose = require('mongoose');

const connectTODb = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error in DB Connection",error);
    }
}

module.exports = { connectTODb };