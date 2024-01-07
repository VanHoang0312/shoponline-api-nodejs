const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const danhmucSchema = new Schema({
  tendanhmuc: String,
  mota: String
},{
    collection: 'danhmuc'
});


const danhmucModel = mongoose.model('danhmuc', danhmucSchema)
module.exports = danhmucModel