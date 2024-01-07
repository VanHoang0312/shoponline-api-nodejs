const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const controller = require('../controllers/account.controller')

//Dang ki
router.post ('/register', 
    [body('username').notEmpty().withMessage('username khong duoc phep de trong'),
    body('password').notEmpty().withMessage('password khong duoc phep de trong'),
    body('role').notEmpty().withMessage('role khong duoc phep de trong')
],
    controller.register
)

//Danh nhap
router.post('/login', controller.login)
//Lay 
router.get('/layall', controller.get)
//Lay theo id
router.get('/:id', controller.getById)
//Sua
router.put('/:id', controller.update)
//Xoa
router.delete('/:id', controller.delete)



module.exports = router