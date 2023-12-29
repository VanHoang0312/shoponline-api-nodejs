const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Dangnhap', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;
 
const sanphamSchema = new Schema({
  ten_san_pham: String,
  mo_ta: String,
  don_gia: Number,
  so_luong: Number,
  anh_dai_dien: String,
  danh_muc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'danhmuc' },
  
},{
    collection: 'sanpham'
});


const sanphamModel = mongoose.model('sanpham', sanphamSchema)
module.exports = sanphamModel