const mongoose = require("mongoose").default;
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    entries: Number,
    joined: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

class Database {
    constructor() {
        this._connect();
    }
    _connect() {
        mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error('Database connection failed');
            });
    }
}

module.exports = {
    Database: new Database(),
    User: User,
};
