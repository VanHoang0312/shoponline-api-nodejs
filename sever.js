const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const AccountModel = require('./models/accont')
const danhmucModel = require('./models/danhmuc')
const sanphamModel = require('./models/sanpham')
const { body, validationResult } = require('express-validator')
const bcrybt = require('bcrypt')
const saltRounds = 10;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/register',
[body('username').notEmpty().withMessage('Chua nhap tai khoan'),
body('password').notEmpty().withMessage('Chua nhap mat khau')], 
 (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
   var username = req.body.username
   var password = req.body.password
   let mahoamatkhau = '';
        bcrybt.genSalt(saltRounds, (err, salt)=>{
            bcrybt.hash(password, salt, (err, hash)=>{
                mahoamatkhau = hash;
                AccountModel.findOne({
                    username: username
                   })
                   .then(data=>{
                        if(data){
                            res.json('Acc nay da ton tai')
                        }else{
                            return AccountModel.create({
                                username: username,
                                password: mahoamatkhau
                            })
                        }
                   })
                   .then(data=>{
                        if (data) {
                            res.json('Tao acc thanh cong')
                        }
                   })
                   .catch(err=>{
                    res.status(500).json('Tao acc that bai')
                   })
            })
        })
})


app.post('/login', async  (req, res, next) =>{
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
         username: username
     })
    .then(account => {
        if (!account) {
            return res.status(500).json('Tai khoan khong chinh xac')
        }

        const checkPassword = bcrybt.compareSync(password, account.password)
        if (!checkPassword) {
            return res.status(500).json('Mat khau khong chinh xac')
        }else {
            return res.status(200).json('Đang nhap thanh cong')
        }
    })
    .catch(error => {
        res.status(500).json('Loi sever')
    })
})

app.post('/taodanhmuc',[
    body('tendanhmuc').notEmpty().withMessage('Chua nhap ten danh muc'),
    body('mota').notEmpty().withMessage('Chua nhap mo ta')
] ,(req, res, next)=>{
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
})


app.post('/taosanpham',[
    body('ten_san_pham').notEmpty().withMessage('Chua nhap ten san pham'),
    body('mo_ta').notEmpty().withMessage('Chua nhap mo ta'),
    body('so_luong').notEmpty().withMessage('Chua nhap so luong'),
    body('don_gia').notEmpty().withMessage('Chua nhap don gia'),
    body('anh_dai_dien').notEmpty().withMessage('Chua nhap anh dai dien'),
    body('danh_muc_id').notEmpty().withMessage('Chua nhap id danh muc'),
] ,(req, res, next)=>{
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
})


var router = require('./router/account')
app.use('/api/account', router)

var routerDanhmuc = require('./router/danhmuc')
app.use('/api/danhmuc', routerDanhmuc)

var routerSanpham = require('./router/sanpham')
app.use('/api/sanpham', routerSanpham)


app.get('/', (req, res, next) =>{
    res.json("Home")
})
app.listen(3000,() =>{
    console.log(`Link: http://localhost:${3000}`)
})