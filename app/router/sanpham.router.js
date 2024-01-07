const express = require('express')
const routerSanpham = express.Router()
const { body, validationResult } = require('express-validator')
const controller = require ('../controllers/sanpham.controller')


//lay
routerSanpham.get('/layall', controller.get )

//lay theo id
routerSanpham.get('/:id', controller.getById)

//hien thi sp khi tim theo danh muc id
routerSanpham.get('/danhmuc/:id', controller.getdanhmucid )
 
//them
routerSanpham.post('/taosanpham',[
    body('ten_san_pham').notEmpty().withMessage('Chua nhap ten san pham'),
    body('mo_ta').notEmpty().withMessage('Chua nhap mo ta'),
    body('so_luong').notEmpty().withMessage('Chua nhap so luong'),
    body('don_gia').notEmpty().withMessage('Chua nhap don gia'),
    body('anh_dai_dien').notEmpty().withMessage('Chua nhap anh dai dien'),
    body('danh_muc_id').notEmpty().withMessage('Chua nhap id danh muc'),
] ,
    controller.create
)
   
//Sua 
routerSanpham.put('/:id', controller.update )

//Xoa
routerSanpham.delete('/:id', controller.delete )


module.exports = routerSanpham