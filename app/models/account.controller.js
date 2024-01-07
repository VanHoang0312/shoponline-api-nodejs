const mongoose = require('mongoose');


const Schema = mongoose.Schema;
 
const accounSchema = new Schema({
  username: String,
  password: String,
  role: Number
},{
    collection: 'account'
});


const AccountModel = mongoose.model('account', accounSchema)
module.exports = AccountModel