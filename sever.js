const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const path = require('path')
const sanphamModel = require('./app/models/sanpham.controller')
const AccountModel = require('./app/models/account.controller')
const{ db_connect } = require ('./app/config/db.config')
db_connect()
const { decode } = require('punycode')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
app.use(cookieParser())




//tap tin tinh
app.use('/public', express.static(path.join( __dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//upload anh
const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.post('/sanpham/store', (req, res) => {
    // Kiem tra xem da nhap du hay chua
    const { tenSanPham, moTa, donGia, soLuong, danhMucId } = req.body
    if (!tenSanPham || !moTa || !donGia || !soLuong || !danhMucId ) {
        return res.status(400).send('Vui long dien day du thong tin')
    }
    let anh_dai_dien = req.files.anh_dai_dien;

     //Luu anh vao thu muc upload
    anh_dai_dien.mv(path.resolve(__dirname, 'public/upload/img', anh_dai_dien.name), function (err) {
        if (err) {
            console.error(err)
            return res.status(500).send('Loi luu tru');
        }

        // Tao moi san pham trong db
        sanphamModel.create({
            ten_san_pham : tenSanPham,
            mo_ta : moTa,
            don_gia : donGia,
            so_luong : soLuong,
            danh_muc_id : danhMucId,
            anh_dai_dien: '/public/upload/img/' + anh_dai_dien.name
        })
        .then(() => {
           res.redirect('/home')
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send('Loi sever')
        });
    });
});


var router = require('./app/router/account.router')
app.use('/api/account', router)

var routerDanhmuc = require('./app/router/danhmuc.router')
app.use('/api/danhmuc', routerDanhmuc)

var routerSanpham = require('./app/router/sanpham.router')
app.use('/api/sanpham', routerSanpham)




//Chay web login
 app.get('/login', (req, res) =>{
     res.sendFile(path.join(__dirname, '/view/login.html'))
 })


//Chay web them sanpham(them anh)
app.get('/themsanpham', (req, res, next) =>{
    res.sendFile(path.join(__dirname, '/view/sanpham.html'))
} )


 //kiem tra neu ad va dang nhap thi vao k thi thoi
 app.get('/home',(req, res, next)=>{
    var token = req.cookies.token
    var decodeToken = jwt.verify(token, 'mk')
    AccountModel.find({
        _id : decodeToken._id
    })
    .then(data =>{
        
        if(data.length ==0){
            return res.redirect('/login')
        }else{
            if(data[0].role == 2){
                next()
            }else{
                return res.redirect('/login')
            }
        }
    })
 } ,(req, res, next) =>{
    res.sendFile(path.join(__dirname, '/view/home.html'))
})
 

//Nut edit neu ad thi dc upload vao db k thi thoi
app.post('/edit', (req, res, next)=>{
    var token = req.headers.cookie.split("=")[1]
    var decodeToken = jwt.verify(token, 'mk')
    AccountModel.find({
        _id : decodeToken._id
    })
    .then(data =>{
        
        if(data.length ==0){
            return res.redirect('/login')
        }else{
            if(data[0].role == 2){
                next()
            }else{
                return res.json({
                    error: true,
                    message : "Ban k co quyen sua o day"
                })
            }
        }
    })
}, (req, res, next)=>{
    res.json("Sua thanh cong")
})
app.listen(3000,() =>{
    console.log(`Link: http://localhost:${3000}`)
})