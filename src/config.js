const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Web3");

connect.then(() => {
    console.log("Database connected");
})
.catch(() => {
    console.log("Database connection failed");
})

const loginSchema = {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}

const collection = new mongoose.model("users", loginSchema);

module.exports = collection;