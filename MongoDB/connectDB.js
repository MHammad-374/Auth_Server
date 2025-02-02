const mongoose = require("mongoose")

const connectDB = async (uri) => {
    try {
        const connect = await mongoose.connect(uri);
        console.log("Successfully connected to database.")
    } catch (error) {
        console.log("MongoDB Connection " + error)
    }
}

module.exports = connectDB