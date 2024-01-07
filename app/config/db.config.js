const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI =  process.env.MONGO_URI || 'mongodb://localhost/Dangnhap'
console.log('MONGO_URI:', MONGO_URI)
mongoose.Promise = global.Promise;
const db_connect = () => mongoose.connect(MONGO_URI, {}).catch(err => {
    setTimeout(db_connect, 5000)
});
module.exports = { db_connect }