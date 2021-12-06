require("dotenv").config();
import  Mongoose  from 'mongoose';


const mongoose = Mongoose.connect(process.env.MONGO_URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
     useCreateIndex: true,
}).then(() => console.log("Connected to MOngoDB"))
    .catch((err) => console.log("Unable to connect to database"))

