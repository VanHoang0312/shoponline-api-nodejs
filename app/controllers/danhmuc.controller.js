const danhmucModel = require('../models/danhmuc.controller')
const { body, validationResult } = require('express-validator')


//Lay danh muc
exports.get = (req, res, next) =>{
    var tendanhmuc = req.body.tendanhmuc
    var mota = req.body.mota

    danhmucModel.find({})
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
}

exports.getById = (req, res, next) =>{
    var id = req.params.id

    danhmucModel.findById({id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

}

//Them danh muc
exports.create = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    var tendanhmuc = req.body.tendanhmuc
    var mota = req.body.mota
    danhmucModel.findOne({
        tendanhmuc : tendanhmuc
    })
    .then(data =>{
        if(data){
            res.json('Ten danh muc da ton tai')
        }else{
            return danhmucModel.create({
                tendanhmuc : tendanhmuc,
                mota : mota
            })
        }
    })
    .then(data =>{
        if(data){
            res.json('Tao danh muc thanh cong')
        }
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
}


//Sua
exports.update = (req, res, next) =>{
    var id = req.params.id
    var newmota = req.body.newmota
    var newtendanhmuc = req.body.newtendanhmuc
    
    danhmucModel.findByIdAndUpdate(id, {
        mota: newmota,
        tendanhmuc : newtendanhmuc
    })
    .then(data=>{
        res.json('Sua thanh cong')
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
}




//Xoa
exports.delete = (req, res, next) =>{
    var id = req.params.id
    danhmucModel.deleteOne({
        _id: id
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })
}

