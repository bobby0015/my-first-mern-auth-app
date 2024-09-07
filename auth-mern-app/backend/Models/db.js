const mongoose = require("mongoose")

const mongo_url = process.env.MONGO_CONN + "/authapp";
console.log(mongo_url)

mongoose.connect(mongo_url)
    .then(() => {
        console.log("Connection Established With MongoDB");
    }).catch((err) => {
        console.log("Failed to Establish the connection", err)
    })