require("dotenv").config();
const app = require("./src/app");
const createDataBase = require("./src/config/database");
createDataBase();
app.listen(3000,()=>{
    console.log("Server is running")
});