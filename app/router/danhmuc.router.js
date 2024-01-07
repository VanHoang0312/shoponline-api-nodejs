const express = require('express')
const routerDanhmuc = express.Router()
const { body, validationResult } = require('express-validator')
const controller = require('../controllers/danhmuc.controller')


//Lay danh muc
routerDanhmuc.get('/layall', controller.get)
    
routerDanhmuc.get('/:id', controller.getById)
 
//Them danh muc
routerDanhmuc.post('/taodanhmuc',
    [body('tendanhmuc').notEmpty().withMessage('Chua nhap ten danh muc'),
    body('mota').notEmpty().withMessage('Chua nhap mo ta')],

    controller.create )

//Sua
routerDanhmuc.put('/:id', controller.update)
  
//Xoa
routerDanhmuc.delete('/:id', controller.delete)



module.exports = routerDanhmuc