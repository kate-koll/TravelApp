const mongoose = require("mongoose");
const dotenv = require("dotenv");

class dbConnect {
    connect() {
        dotenv.config();
        mongoose.connect(process.env.DB_CONNECT,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },(err) => {
            if(err) {
                throw new Error("Connecting to database failed.");
            }
            console.log("Connected to database successfully.");            
        })
    }
}

module.exports = new dbConnect();