const mongoose = require("mongoose");

async function createDataBase(){
    await mongoose.connect(process.env.MONGO_URI);
    await console.log("Database Connected");
}
module.exports = createDataBase;