const sanphamModel = require ('../models/sanpham.controller')
const { body, validationResult } = require('express-validator')


//lay
exports.get = (req, res, next) =>{
    var ten_san_pham = req.body.ten_san_pham
    var mo_ta = req.body.mo_ta
    var so_luong = req.body.so_luong
    var don_gia = req.body.don_gia
    var anh_dai_dien = req.body.anh_dai_dien
    var danh_muc_id = req.body.danh_muc_id

    sanphamModel.find({})
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
}

exports.getById = (req, res, next) =>{
    var id = req.params.id

    sanphamModel.findById({id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

}

//hien thi sp khi tim theo danh muc id
 exports.getdanhmucid = (req, res, next) => {
    var danh_muc_id = req.params.id;
    sanphamModel.find({
         danh_muc_id: danh_muc_id 
        })
        .then(data => {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.json('K tim thay');
            }
        })
        .catch(err => {
            res.status(500).json('Lỗi server');
        });
}


//them
exports.create = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    var ten_san_pham = req.body.ten_san_pham
    var mo_ta = req.body.mo_ta
    var so_luong = req.body.so_luong
    var don_gia = req.body.don_gia
    var anh_dai_dien = req.body.anh_dai_dien
    var danh_muc_id = req.body.danh_muc_id

    sanphamModel.findOne({
        ten_san_pham : ten_san_pham
    })
    .then(data =>{
        if(data){
            res.json('San pham da ton tai')
        }else{
            return sanphamModel.create({
                ten_san_pham : ten_san_pham,
                mo_ta : mo_ta,
                so_luong: so_luong,
                don_gia :don_gia,
                anh_dai_dien : anh_dai_dien,
                danh_muc_id : danh_muc_id
            })
        }
    })
    .then(data =>{
        if(data){
            res.json('Tao san pham thanh cong')
        }
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
}

//Sua 
exports.update = (req, res, next) =>{
    var id = req.params.id
    var newtensanpham = req.body.newtensanpham
    var newmota = req.body.newmota
    var newsoluong = req.body.newsoluong
    var newdongia = req.body.newdongia
    var newanhdaidien = req.body.newanhdaidien
    var newdanhmucid = req.body.newdanhmucid
    
    sanphamModel.findByIdAndUpdate(id, {
        ten_san_pham: newtensanpham,
        mo_ta : newmota,
        so_luong: newsoluong,
        don_gia :newdongia,
        anh_dai_dien : newanhdaidien,
        danh_muc_id : newdanhmucid
    })
    .then(data=>{
        if (data) {
            res.json('Sua thanh cong')
        }else {
            res.json("Sua that bai")
        }
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
}




//Xoa
exports.delete = (req, res, next) =>{
    var id = req.params.id
    sanphamModel.deleteOne({
        _id: id
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })
}













