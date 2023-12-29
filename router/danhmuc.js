const express = require('express')
const routerDanhmuc = express.Router()
const danhmucModel = require('../models/danhmuc')
const { body, validationResult } = require('express-validator')



//Lay danh muc
routerDanhmuc.get('/lay', (req, res, next) =>{
    var tendanhmuc = req.body.tendanhmuc
    var mota = req.body.mota

    danhmucModel.find({})
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
})

routerDanhmuc.get('/:id', (req, res, next) =>{
    var id = req.params.id

    danhmucModel.findById({id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

//Them danh muc
routerDanhmuc.post('/them',
[body('tendanhmuc').notEmpty().withMessage('Chua nhap ten danh muc'),
body('mota').notEmpty().withMessage('Chua nhap mo ta')], 
async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg)
        return res.status(400).json({ errors: errorMessages })
    }

    var tendanhmuc = req.body.tendanhmuc
    var mota = req.body.mota

    try {
        const kiemtratendanhMuc = await danhmucModel.findOne({
             tendanhmuc: req.body.tendanhmuc
        })
        if (kiemtratendanhMuc) {
            // neu ten danh muc da ton tai tra ve thong bao loi
            return res.status(400).json('Ten danh muc đa ton tai')
        }

        // Neu danh muc chua ton tai thi them moi
        const newDanhMuc = await danhmucModel.create({
            tendanhmuc: req.body.tendanhmuc,
            mota: req.body.mota
        });

        res.json('Them thanh cong')
    } catch (err) {
        
        res.status(500).json('Loi sever')
    }
})

//Sua
routerDanhmuc.put('/:id', (req, res, next) =>{
    var id = req.params.id
    var newMota = req.body.newMota
    var newTendanhmuc = req.body.newTendanhmuc
    
    danhmucModel.findByIdAndUpdate(id, {
        mota: newMota,
        tendanhmuc : newTendanhmuc
    })
    .then(data=>{
        res.json('Sua thanh cong')
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
})




//Xoa
routerDanhmuc.delete('/:id', (req, res, next) =>{
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
})



module.exports = routerDanhmuc