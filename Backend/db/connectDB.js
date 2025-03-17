const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log(`DB is connected`)
    }).catch((e) => {
        console.log(`DB not connect -ERROR: ${e.message}`);
    })
}

module.exports = connectDB;